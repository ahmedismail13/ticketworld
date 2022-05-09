import { IsEnum, IsNumber } from 'class-validator';
import { ReservationType } from '../utils/ReservationTypes';

export class CreateReservationDto {
  @IsNumber({}, { each: true })
  public tickets: number[];

  @IsEnum(ReservationType)
  public type: ReservationType;
}
