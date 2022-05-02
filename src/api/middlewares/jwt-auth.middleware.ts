import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import './passport';

export default function authenticateWithJwt(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    return next();
  })(req, res, next);
}
