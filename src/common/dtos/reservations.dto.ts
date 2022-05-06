import { IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber({}, { each: true })
  public tickets: number[];
}
