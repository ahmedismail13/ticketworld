import { ArrayNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  public tickets: number[];

  @IsNumber()
  @IsNotEmpty()
  public type: number;

  @IsNumber()
  @IsNotEmpty()
  eventId: number;
}
