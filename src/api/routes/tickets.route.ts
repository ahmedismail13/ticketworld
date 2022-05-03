import { Router } from 'express';
import Route from '../../common/interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authenticateWithJwt from '../middlewares/jwt-auth.middleware';
import TicketsContoller from '../../controllers/tickets.controller';

class TicketsRoute implements Route {
  public path = '/tickets';
  public router = Router();
  public ticketsContoller = new TicketsContoller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:eventId`, this.ticketsContoller.getAllTicketsForAnEvent);
  }
}

export default TicketsRoute;
