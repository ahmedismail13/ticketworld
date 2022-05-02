import { Reservation } from '../entities/reservations.entity';

class ReservationService {
  public async findAllReservations(userInfo): Promise<Reservation[]> {
    const reservations: Reservation[] = await Reservation.find({ where: { userId: userInfo.id } });
    return reservations;
  }
}

export default ReservationService;
