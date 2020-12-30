import { default as IAsyncData } from './IAsyncData'

import { default as ILoginState } from './login';
import { default as IMFAState } from './mfa';
import { default as IUserState } from './user';
import { default as IRoomsState } from './rooms';
import { default as IGamesState } from './games';

export default interface IState {
  login: ILoginState,
  mfa: IMFAState,
  user: IUserState,
  rooms: IRoomsState,
  games: IGamesState,
};

export {
  IAsyncData,
  ILoginState,
  IMFAState,
  IUserState,
  IRoomsState,
  IGamesState,
};