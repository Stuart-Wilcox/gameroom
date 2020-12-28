import { Token, User } from '../../utils';
import { logout as performLogout } from '../../service';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const logout = (username: string) => ({
    type: LOGOUT,
    payload: { username },
});

export const logoutSuccess = (response: any) => ({
    type: LOGOUT_SUCCESS,
    payload: response,
});

export const logoutFailed = (err: any) => ({
    type: LOGOUT_FAILED,
    payload: err,
});

export default (username: string) => async (dispatch: React.Dispatch<any>) => {
    dispatch(logout(username));

    try {
        const response = await performLogout(username);
        const { message, err } = response;
        if (err) {
            dispatch(logoutFailed(err));
        }
        else {
            dispatch(logoutSuccess(message));
            
            // clear storage
            Token.delete();
            User.delete();

            // redirect to login
            window.location.href = '/login';
        }
    }
    catch (err) {
        dispatch(logoutFailed(err));
    }
};