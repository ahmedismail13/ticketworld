import * as Boom from '@hapi/boom';
import { In, IsNull, MoreThan, MoreThanOrEqual } from 'typeorm';
import { isEmpty } from '../common/utils/util';
import { Reservation } from '../entities/reservations.entity';
import { Ticket } from '../entities/ticket.entity';
import { ReservationType } from '../common/utils/ReservationTypes';

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

  public async createReservation(userInfo, tickets: number[], type: ReservationType): Promise<Reservation> {
    try {
      const ticketsToReserve = await Ticket.find({
        where: [
          {
            id: In(tickets),
            reservation: {
              payed: IsNull(),
              paymentInProgress: false,
              createdAt: MoreThanOrEqual(new Date(Date.now() - 15 * 60000)),
            },
          },
        ],
        relations: {
          ticketType: true,
        },
      });

      if (isEmpty(ticketsToReserve)) throw Boom.notFound('Tickets not found');
      if (ticketsToReserve.length !== tickets.length) throw Boom.badData('Some tickets are already reserved');
      // if (!this.validateTicketsByReservationType(type, ticketsToReserve)) throw Boom.badData('Tickets are not valid for this reservation type');
      const reservation = new Reservation();
      reservation.userId = userInfo.id;
      reservation.paymentInProgress = false;
      reservation.type = type;

      ticketsToReserve.forEach(ticket => {
        ticket.reservation = reservation;
        ticket.reservationId = reservation.id;

        ticket.save();
      });

      const totalPrice = ticketsToReserve.reduce((acc, ticket) => acc + Number(ticket.ticketType.price), 0);
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

  // public async validateTicketsByReservationType(reservationType: ReservationType, tickets: Ticket[]): Promise<boolean> {
  //   try {
  //     switch (reservationType) {
  //       case ReservationType.EVEN:
  //         return tickets.length % 2 === 0;
  //       case ReservationType.AVOID_ONE:
  //         const availableTickets = await Ticket.count({
  //           where: {
  //             reservation: IsNull(),
  //           },
  //         });
  //         return availableTickets - tickets.length > 1;
  //       case ReservationType.ALL_TOGETHER:
  //         return tickets.every((ticket)=> ticket.)
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

export default ReservationService;
