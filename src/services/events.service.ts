import { Event } from '../entities/events.entity';
import { Ticket } from '../entities/ticket.entity';

class EventsService {
  public async findAllEvents(): Promise<Event[]> {
    const events: Event[] = await Event.find();
    return events;
  }

  public async createEvent(
    name: string,
    description: string,
    date: Date,
    venue: string,
    ticketPrice: number,
    imageUrl: string,
    quantity: number,
  ): Promise<Event> {
    try {
      const event = new Event();
      event.name = name;
      event.description = description;
      event.date = date;
      event.venue = venue;
      event.ticketPrice = ticketPrice;
      event.imagePath = imageUrl;
      await event.save();

      for (let i = 0; i < quantity; i++) {
        const ticket = new Ticket();
        ticket.seat_number = i + 1;
        ticket.event = event;
        await ticket.save();
      }

      return event;
    } catch (error) {
      throw error;
    }
  }
}

export default EventsService;
