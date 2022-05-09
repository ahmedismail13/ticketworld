import { NextFunction, Request, Response } from 'express';
import TicketsService from '../services/tickets.service';
class TicketsContoller {
  public ticketsService = new TicketsService();

  public getAllTicketsForAnEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allTickets = await this.ticketsService.findAllTicketsForAnEvent(Number(req.params.id));
      res.status(200).json({ count: allTickets.length, data: allTickets });
    } catch (error) {
      next(error);
    }
  };
}

export default TicketsContoller;
