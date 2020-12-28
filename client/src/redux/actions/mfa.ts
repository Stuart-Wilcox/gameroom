import { submitMFAToken } from '../../service'
import { Token, User } from '../../utils';

export const SUBMIT_MFA = 'SUBMIT_MFA';
export const SUBMIT_MFA_SUCCESS = 'SUBMIT_MFA_SUCCESS';
export const SUBMIT_MFA_FAILED = 'SUBMIT_MFA_FAILED';

export const submitMFA = () => ({
  type: SUBMIT_MFA,
});

export const submitMFASuccess = (message: string) => ({
  type: SUBMIT_MFA_SUCCESS,
  payload: message,
});

export const submitMFAFailed = (err: any) => ({
  type: SUBMIT_MFA_FAILED,
  payload: err,
});

export default (username: string, mfaToken: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(submitMFA());

  try {
    const response = await submitMFAToken(username, mfaToken);
    
    const { err, message, user, token } = response;
    if (err) {
      dispatch(submitMFAFailed(err));
      return;
    }
    else {
      setImmediate(() => Token.set(token));
      setImmediate(() => User.set(user));
      setImmediate(() => dispatch(submitMFASuccess(user)));
      return;
    }
  }
  catch (err) {
    dispatch(submitMFAFailed(err));
  }
};