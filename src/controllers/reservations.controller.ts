import { NextFunction, Request, Response } from 'express';
import { CreateReservationDto } from '../common/dtos/reservations.dto';
import { Reservation } from '../entities/reservations.entity';
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

  public createReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reservationData: CreateReservationDto = req.body;
      const reservation: Reservation = await this.reservationService.createReservation(req.user, reservationData.tickets);

      res.status(201).json({ id: reservation.id, totalPrice: reservation.totalPrice });
    } catch (error) {
      next(error);
    }
  };
}

export default ReservationsController;
