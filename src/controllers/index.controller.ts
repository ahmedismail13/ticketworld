import { NextFunction, Request, Response } from 'express';
class IndexController {
  constructor() {}
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(200).send('Hello World!');
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
