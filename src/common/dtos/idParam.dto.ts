import { IsNumber } from 'class-validator';

export class IdParamValidator {
  @IsNumber()
  public id: number;
}
