import { combineReducers } from 'redux';

import login from './login';
import mfa from './mfa';
import user from './user';
import rooms from './rooms';
import games from './games';

export default combineReducers({
  login,
  mfa,
  user,
  rooms,
  games,
});