import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import './passport';

export default function authenticateWithJwt(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).send('unauthorized');
    }
    req.user = user;
    next();
  })(req, res, next);
}
