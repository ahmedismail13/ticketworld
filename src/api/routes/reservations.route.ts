import { Router } from 'express';
import Route from '../../common/interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import ReservationsController from '../../controllers/reservations.controller';
import authenticateWithJwt from '../middlewares/jwt-auth.middleware';
import { CreateReservationDto } from '../../common/dtos/reservations.dto';
import { IdParamValidator } from '../../common/dtos/idParam.dto';

class ReservationsRoute implements Route {
  public path = '/reservations';
  public router = Router();
  public reservationsController = new ReservationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authenticateWithJwt], this.reservationsController.getAllReservations);
    this.router.get(
      `${this.path}/:id`,
      [authenticateWithJwt, validationMiddleware(IdParamValidator, 'params')],
      this.reservationsController.getReservationById,
    );
    this.router.post(
      `${this.path}`,
      [authenticateWithJwt, validationMiddleware(CreateReservationDto, 'body')],
      this.reservationsController.createReservation,
    );
    this.router.post(
      `${this.path}/payment/:id`,
      [authenticateWithJwt, validationMiddleware(IdParamValidator, 'params')],
      this.reservationsController.payReservation,
    );
    this.router.put(
      `${this.path}/:id`,
      [authenticateWithJwt, validationMiddleware(IdParamValidator, 'params')],
      this.reservationsController.pendReservation,
    );
    this.router.delete(
      `${this.path}/:id`,
      [authenticateWithJwt, validationMiddleware(IdParamValidator, 'params')],
      this.reservationsController.cancelReservation,
    );
  }
}

export default ReservationsRoute;
