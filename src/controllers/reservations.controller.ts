import { NextFunction, Request, Response } from 'express';
import ReservationService from '../services/reservations.service';
class ReservationsController {
  public reservationService = new ReservationService();

  public getAllReservations = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const allReservations = this.reservationService.findAllReservations(req.user);
      res.status(200).json({ allReservations });
    } catch (error) {
      next(error);
    }
  };
}

export default ReservationsController;
