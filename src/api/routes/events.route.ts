import { Router } from 'express';
import Route from '../../common/interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authenticateWithJwt from '../middlewares/jwt-auth.middleware';
import EventsController from '../../controllers/events.contoller';
import { CreateEventDto } from '../../common/dtos/events.dto';

class EventsRoute implements Route {
  public path = '/events';
  public router = Router();
  public eventsController = new EventsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.eventsController.getAllEvents);
    this.router.post(`${this.path}`, [authenticateWithJwt, validationMiddleware(CreateEventDto, 'body')], this.eventsController.createEvent);
  }
}

export default EventsRoute;
