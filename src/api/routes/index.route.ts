import { Router } from 'express';
import IndexController from '../../controllers/index.controller';
import Route from '../../common/interfaces/routes.interface';
import authenticateWithJwt from '../middlewares/jwt-auth.middleware';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authenticateWithJwt], (req, res, next) => {
      console.log(req.user);
      return res.status(200).json({ message: 'Hello World' });
    });
  }
}

export default IndexRoute;
