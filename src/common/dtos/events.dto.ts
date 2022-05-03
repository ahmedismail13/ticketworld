import { IsDateString, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEventTypeDto } from './ticketType.dto';

export class CreateEventDto {
  @IsString()
  public name: string;

  @IsDateString()
  public date: Date;

  @IsString()
  public description: string;

  @IsString()
  public venue: string;

  @ValidateNested()
  @Type(() => CreateEventTypeDto)
  public ticketTypes: CreateEventTypeDto[];
}
