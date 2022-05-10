import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsDateString()
  @IsNotEmpty()
  public date: Date;

  @IsString()
  public description: string;

  @IsString()
  public venue: string;

  @IsString()
  public imagePath: string;

  @IsNumber()
  @IsNotEmpty()
  public ticketPrice: number;

  @IsNumber()
  @IsNotEmpty()
  public quantity: number;
}
