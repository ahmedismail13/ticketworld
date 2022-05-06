import * as Boom from '@hapi/boom';
import { In } from 'typeorm';
import { isEmpty } from '../common/utils/util';
import { Reservation } from '../entities/reservations.entity';
import { Ticket } from '../entities/ticket.entity';

class ReservationService {
  public async findAllReservations(userInfo): Promise<Reservation[]> {
    const reservations: Reservation[] = await Reservation.find({ where: { userId: userInfo.id } });
    return reservations;
  }

  public async createReservation(userInfo, tickets: number[]): Promise<Reservation> {
    try {
      const ticketsToReserve = await Ticket.find({
        where: {
          id: In(tickets),
          reservationId: null,
        },
        relations: {
          ticketType: true,
        },
      });

      if (isEmpty(ticketsToReserve)) throw Boom.notFound();
      if (ticketsToReserve.length !== tickets.length) throw Boom.conflict();

      const reservation = new Reservation();
      reservation.userId = userInfo.id;
      reservation.paymentInProgress = false;

      ticketsToReserve.forEach(ticket => {
        ticket.reservation = reservation;
        ticket.reservationId = reservation.id;

        ticket.save();
      });

      const totalPrice = ticketsToReserve.reduce((acc, ticket) => acc + ticket.ticketType.price, 0);
      reservation.totalPrice = totalPrice;

      reservation.tickets = ticketsToReserve;
      await reservation.save();

      return reservation;
    } catch (error) {
      throw error;
    }
  }
}

export default ReservationService;
