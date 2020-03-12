import { Router } from 'Express';
import * as Passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as JWT from 'jsonwebtoken';

import secret from './secret';
import { validate } from '../routes/utils';
import generateAndSendMFAToken from './utils';
import { User, validateMFAToken } from '../models';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, email } = req.body; 

  const err = await validate({ username, email });
  if (err) {
    res.status(400).json({ err });
    return;
  }

  // check if that name is taken
  let user;
  try {
    user = await User.findOne({ username });
    if (user) {
      // existing user, email does not match
      if (user.email !== email) {
        res.status(400).json({ err: `Username ${username} is taken` });
        return;
      }
    }
  } catch (err) {
    res.status(500).json({ err });
    return;
  }

  const mfaToken = generateAndSendMFAToken(email);

  // create new user if not exist and save mfa token
  if (!user) {
    user = new User({
      username,
      email,
      mfaToken,
      isActive: false,
    });
  }
  else {
    user.mfaToken = mfaToken;
  }

  try {
    await user.save();
  }
  catch (err) {
    res.status(500).json({ err });
    return;
  }

  // send back user details
  const sendUser = { username, email, id: user.id };
  res.json({ user: sendUser, message: `MFA Token has been sent to ${email}` });
  return;
});

const options = {
  usernameField: 'username',
  passwordField: 'mfaToken',
};

const verify = async (username: string, mfaToken: string, done: any) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { err: 'Incorrect username' });
    }

    // validate mfa token
    const { err, success } = validateMFAToken(user, mfaToken);
    if (err) {
      return done({ err });
    }

    if (!success) {
      return done(null, false);
    }

    // success
    return done(null, user);
  } catch (err) {
    return done({ err });
  }
}

Passport.use(new PassportLocal.Strategy(
  options,
  verify
));

router.post('/mfa', (req, res) => {
  Passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      const body = {
        ...info,
        ...err,
      }
      res.status(400).json(body);
      return;
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(500).json({ err });
        return;
      }
    });

    const plainUser = {
      username: user.username,
      isActive: user.isActive,
      id: user.id,
    };

    const token = JWT.sign(plainUser, secret);
    res.json({ user: plainUser, token });
    return;
  })(req, res);
});

export default router;
export { Passport };