import { default as ILoginState } from './login';
import { default as IMFAState } from './mfa';
import { default as IUserState } from './user';
import { default as IRoomsState } from './rooms';

export default interface IState {
  login: ILoginState,
  mfa: IMFAState,
  user: IUserState,
  rooms: IRoomsState,
};

export {
  ILoginState,
  IMFAState,
  IUserState,
  IRoomsState,
};