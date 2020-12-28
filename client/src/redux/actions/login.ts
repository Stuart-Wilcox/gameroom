import { login as performLogin} from '../../service'

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const login = (username: string, email: string) => ({
  type: LOGIN,
  payload: { username, email },
});

export const loginSuccess = (response: any) => ({
  type: LOGIN_SUCCESS,
  payload: response,
});

export const loginFailed = (err: any) => ({
  payload: err,
  type: LOGIN_FAILED,
});

export default (username: string, email: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(login(username, email));

  try {
    const response = await performLogin(username, email);
    const { message, err } = response;
    if (err) {
      dispatch(loginFailed(err));
    }
    else {
      dispatch(loginSuccess(message));
    }
  }
  catch (err) {
    dispatch(loginFailed(err));
  }
};