import { NextFunction, Request, Response } from 'express';

import { isBoom, Boom } from '@hapi/boom';

function errorMiddleware(error: Boom | Error, req: Request, res: Response, next: NextFunction) {
  const statusCode: number = isBoom(error) ? error.output.statusCode : 500;
  const errorMessage: string = isBoom(error) ? error.message : 'Something went wrong';
  console.log(`StatusCode : ${statusCode}, Message : ${errorMessage}`);
  console.log(error);

  return res.status(statusCode).send({
    message: errorMessage,
  });
}
export default errorMiddleware;
