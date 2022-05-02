import { Request } from 'express';
import { User } from '../../entities/users.entity';

export interface DataStoredInToken {
  id: number;
  name: string;
  email: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
