import { ILoginState } from '../states';
import { LoginActions } from '../actions';

const initialState: ILoginState = {
  username: '',
  email: '',
  message: '',
  err: '',
};

export default function (state = initialState, action: any): ILoginState {
  switch (action.type) {
    case LoginActions.LOGIN:
      return login(state, action.payload);
    case LoginActions.LOGIN_SUCCESS:
      return loginSuccess(state, action.payload);
    case LoginActions.LOGIN_FAILED:
      return loginFailed(state, action.payload);
    default:
      return state;
  }
};

const login = (state: ILoginState, payload: any): ILoginState => {
  const { username, email } = payload;
  return {
    ...state,
    username,
    email,
    err: '',
    message: '',
  };
};

const loginSuccess = (state: ILoginState, payload: any): ILoginState => {
  const message = payload;
  return {
    ...state,
    message,
  };
};

const loginFailed = (state: ILoginState, payload: any): ILoginState => {
  const err = payload;
  return {
    ...state,
    err,
    username: '',
    email: '',
  };
};