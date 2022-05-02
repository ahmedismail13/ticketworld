import { Router } from 'express';
import Route from '../../common/interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import ReservationsController from '../../controllers/reservations.controller';
import authenticateWithJwt from '../middlewares/jwt-auth.middleware';

class ReservationsRoute implements Route {
  public path = '/reservations';
  public router = Router();
  public reservationsController = new ReservationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authenticateWithJwt], this.reservationsController.getAllReservations);
    // this.router.get(`${this.path}/:id`, [jwtAuthMiddeware], this.reservationsController.getUserById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.reservationsController.createUser);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.reservationsController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.reservationsController.deleteUser);
  }
}

export default ReservationsRoute;
