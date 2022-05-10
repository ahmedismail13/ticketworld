import * as Boom from '@hapi/boom';
import { Brackets, IsNull, Not } from 'typeorm';
import { isEmpty } from '../common/utils/util';
import { Reservation } from '../entities/reservations.entity';
import { Ticket } from '../entities/ticket.entity';
import { ReservationType } from '../common/utils/ReservationTypes';
import { dbConnection } from '../db/connection';

const SEATS_SPAN = 5;

class ReservationService {
  public async findAllReservations(userInfo): Promise<Reservation[]> {
    try {
      const reservations: Reservation[] = await Reservation.find({ where: { userId: userInfo.id } });
      return reservations;
    } catch (error) {
      throw error;
    }
  }

  public async findReservationById(id: number): Promise<Reservation> {
    try {
      const reservation: Reservation = await Reservation.findOne({ where: { id } });
      if (!reservation) throw Boom.notFound('Reservation not found');
      return reservation;
    } catch (error) {
      throw error;
    }
  }

  public async createReservation(userInfo, tickets: number[], type: number, eventId: number): Promise<Reservation> {
    try {
      const ticketsToReserve = await dbConnection
        .createQueryBuilder(Ticket, 'ticket')
        .leftJoinAndSelect('ticket.reservation', 'reservation')
        .leftJoinAndSelect('ticket.event', 'event')
        .where('ticket.id IN (:...tickets)', { tickets })
        .andWhere('event.id = :eventId', { eventId })
        .andWhere(
          new Brackets(qb => {
            qb.where('ticket.reservation IS NULL').orWhere(
              new Brackets(qb2 => {
                qb2
                  .where('reservation.payed IS NULL')
                  .andWhere('reservation.paymentInProgress = :paymentInProgress', { paymentInProgress: false })
                  .andWhere('reservation.createdAt < :createdAt', { createdAt: new Date(Date.now() - 15 * 60000) });
              }),
            );
          }),
        )
        .getMany();

      if (isEmpty(ticketsToReserve)) throw Boom.badRequest('Tickets are not available or not found');
      if (ticketsToReserve.length !== tickets.length) throw Boom.badRequest('Some tickets are already reserved');
      if (!(await this.validateTicketsByReservationType(type, ticketsToReserve, eventId)))
        throw Boom.badRequest('Tickets are not valid for this reservation type');

      const reservation = new Reservation();
      reservation.userId = userInfo.id;
      reservation.paymentInProgress = false;
      reservation.type = type;

      ticketsToReserve.forEach(ticket => {
        ticket.reservation = reservation;
        ticket.reservationId = reservation.id;

        ticket.save();
      });

      const totalPrice = ticketsToReserve.reduce((acc, ticket) => acc + Number(ticket.event.ticketPrice), 0);
      reservation.totalPrice = totalPrice;
      reservation.tickets = ticketsToReserve;
      await reservation.save();

      return reservation;
    } catch (error) {
      throw error;
    }
  }

  public async pendReservation(id: number): Promise<Reservation> {
    try {
      const reservation: Reservation = await Reservation.findOne({ where: { id } });
      if (!reservation) throw Boom.notFound('Reservation not found');

      reservation.paymentInProgress = true;
      await reservation.save();

      return reservation;
    } catch (error) {
      throw error;
    }
  }

  public async payReservation(id: number): Promise<Reservation> {
    try {
      const reservation: Reservation = await Reservation.findOne({ where: { id } });
      if (!reservation) throw Boom.notFound('Reservation not found');

      reservation.paymentInProgress = false;
      reservation.payed = new Date();
      await reservation.save();

      return reservation;
    } catch (error) {
      throw error;
    }
  }

  public async cancelReservation(id: number): Promise<Reservation> {
    try {
      const reservation: Reservation = await Reservation.findOne({ where: { id } });
      if (!reservation) throw Boom.notFound('Reservation not found');

      return await Reservation.remove(reservation);
    } catch (error) {
      throw error;
    }
  }

  public async validateTicketsByReservationType(reservationType: number, tickets: Ticket[], eventId: number): Promise<boolean> {
    try {
      if (ReservationType.EVEN === reservationType) return tickets.length % 2 === 0;
      else if (ReservationType.AVOID_ONE === reservationType) {
        const availableTickets = await dbConnection
          .createQueryBuilder(Ticket, 'ticket')
          .leftJoinAndSelect('ticket.reservation', 'reservation')
          .where('ticket.eventId = :eventId', { eventId })
          .andWhere('ticket.reservationId IS NULL')
          .getCount();

        return availableTickets - tickets.length > 1;
      } else if (ReservationType.ALL_TOGETHER === reservationType) {
        tickets.sort();
        let allTogetherFlag = true;
        for (let i = 0; i < tickets.length - 1; i++) {
          if (tickets[i + 1].seat_number - tickets[i].seat_number !== 1) allTogetherFlag = false;
        }
        return allTogetherFlag;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default ReservationService;
