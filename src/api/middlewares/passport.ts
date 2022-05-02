/* eslint-disable @typescript-eslint/no-var-requires */
import passport from 'passport';

import JwtStrategy from 'passport-jwt';
import { User } from '../../entities/users.entity';

passport.use(
  new JwtStrategy.Strategy(
    {
      jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne(payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
