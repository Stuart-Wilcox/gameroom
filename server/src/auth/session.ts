import * as Session from 'express-session';
import secret from './secret';

const cookie = process.env.PRODUCTION ? { secure: true } : {};

export default Session({
  secret,
  cookie,
  resave: false,
  saveUninitialized: false,
});