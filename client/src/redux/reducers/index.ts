import { combineReducers } from 'redux';

import login from './login';
import mfa from './mfa';
import rooms from './rooms';

export default combineReducers({
  login,
  mfa,
  rooms,
});