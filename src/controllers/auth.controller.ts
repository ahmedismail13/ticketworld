import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { CreateUserDto, LoginUserDto } from '../common/dtos/users.dto';
import { RequestWithUser } from '../common/interfaces/auth.interface';
import { User } from '../entities/users.entity';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ id: signUpUserData.id });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginUserDto = req.body;
      const { token, findUser } = await this.authService.login(userData);

      const userResponse = _.pick(findUser, ['id', 'name', 'email']);

      res.status(200).json({ ...userResponse, token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default AuthController;
