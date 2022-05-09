import { Router } from 'express';
import Route from '../../common/interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authenticateWithJwt from '../middlewares/jwt-auth.middleware';
import TicketsContoller from '../../controllers/tickets.controller';
import { IdParamValidator } from '../../common/dtos/idParam.dto';

class TicketsRoute implements Route {
  public path = '/tickets';
  public router = Router();
  public ticketsContoller = new TicketsContoller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, [validationMiddleware(IdParamValidator, 'params')], this.ticketsContoller.getAllTicketsForAnEvent);
  }
}

export default TicketsRoute;
