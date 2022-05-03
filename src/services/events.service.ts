import { CreateEventTypeDto } from '../common/dtos/ticketType.dto';
import { Event } from '../entities/events.entity';
import { TicketType } from '../entities/ticketType.entity';
import { Ticket } from '../entities/ticket.entity';

class EventsService {
  public async findAllEvents(): Promise<Event[]> {
    const events: Event[] = await Event.find();
    return events;
  }

  public async createEvent(name: string, description: string, date: Date, venue: string, ticketTypes: CreateEventTypeDto[]): Promise<Event> {
    try {
      const event = new Event();
      event.name = name;
      event.description = description;
      event.date = date;
      event.venue = venue;
      await event.save();

      const ticketsTypes: TicketType[] = [];

      for (const ticketType of ticketTypes) {
        const ticketTypeInstance = new TicketType();
        ticketTypeInstance.event = event;
        ticketTypeInstance.name = ticketType.name;
        ticketTypeInstance.price = ticketType.price;
        await ticketTypeInstance.save();

        ticketsTypes.push(ticketTypeInstance);
      }

      ticketTypes.forEach(async ticketType => {
        const ticketTypeInDb = ticketsTypes.find(ticketTypeItem => ticketTypeItem.name === ticketType.name);
        for (let i = 0; i < ticketType.quantity; i++) {
          const ticket = new Ticket();
          ticket.ticketType = ticketTypeInDb;
          ticket.seat_number = i + 1;
          ticket.event = event;
          await ticket.save();
        }
      });

      return event;
    } catch (error) {
      throw error;
    }
  }
}

export default EventsService;
