import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IdParamValidator {
  @IsNumberString()
  @IsNotEmpty()
  public id: number;
}
