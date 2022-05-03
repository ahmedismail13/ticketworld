import { IsNumber, IsString } from 'class-validator';

export class CreateEventTypeDto {
  @IsString()
  public name: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public quantity: number;
}
