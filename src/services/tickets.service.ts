import { Brackets } from 'typeorm';
import { dbConnection } from '../db/connection';
import { Ticket } from '../entities/ticket.entity';

class TicketsService {
  public async findAllTicketsForAnEvent(eventId): Promise<Ticket[]> {
    const tickets: Ticket[] = await dbConnection
      .createQueryBuilder(Ticket, 'ticket')
      .leftJoin('ticket.reservation', 'reservation')
      .leftJoinAndSelect('ticket.event', 'event')
      .select(['ticket.id', 'ticket.seat_number'])
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
    return tickets;
  }
}

export default TicketsService;
