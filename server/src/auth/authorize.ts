import { Router } from 'express';
import { Strategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import { Passport } from './authenticate'
import secret from './secret';
import { User } from '../models';


const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const verify = async (JWTPayload: any, done: any) => {
  const { username } = JWTPayload;
  try {
    const user = await User.findOne({ username })
    done(null, user);
  }
  catch (err) {
    done(err);
    return;
  }
};

Passport.use(new Strategy(options, verify));

const router = Router();

router.use('/', Passport.authenticate('jwt', { session: false }));

export default router;
export { Passport };