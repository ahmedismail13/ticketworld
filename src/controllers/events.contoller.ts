import { NextFunction, Request, Response } from 'express';
import { CreateEventDto } from '../common/dtos/events.dto';
import EventsService from '../services/events.service';
class EventsController {
  public eventsService = new EventsService();

  public getAllEvents = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const allEvents = this.eventsService.findAllEvents();
      res.status(200).json({ allEvents });
    } catch (error) {
      next(error);
    }
  };

  public createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventData: CreateEventDto = req.body;
      const event = await this.eventsService.createEvent(
        eventData.name,
        eventData.description,
        eventData.date,
        eventData.venue,
        eventData.ticketTypes,
      );
      res.status(201).json({ event });
    } catch (error) {
      next(error);
    }
  };
}

export default EventsController;
