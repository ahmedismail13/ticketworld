import { Ticket } from '../entities/ticket.entity';

class TicketsService {
  public async findAllTicketsForAnEvent(eventId): Promise<Ticket[]> {
    const tickets: Ticket[] = await Ticket.find({
      relations: {
        ticketType: true,
        event: true,
      },
      where: { event: { id: eventId } },
      select: ['id', 'seat_number', 'createdAt', 'updatedAt', 'event', 'ticketType'],
    });
    return tickets;
  }
}

export default TicketsService;
