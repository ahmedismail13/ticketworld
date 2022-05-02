/* eslint-disable @typescript-eslint/no-var-requires */
import passport from 'passport';

import JwtStrategy = require('passport-jwt');
import { User } from '../../entities/users.entity';

const opts = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy.Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findOne({ where: { id: payload.id }, select: ['id', 'name', 'email'] });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }),
);
