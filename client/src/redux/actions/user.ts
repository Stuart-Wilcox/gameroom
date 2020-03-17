import * as React from 'react';
import {
  retrieveCurrentUser as performRetrieveCurrentUser,
} from 'src/service';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const fetchUser = () => ({
  type: FETCH_USER,
});
export const fetchUserSuccess = (user: any) => ({
  type: FETCH_USER,
  payload: user,
});
export const fetchUserFailed = (err: any) => ({
  type: FETCH_USER,
  payload: err,
});

export const fetchUserThunk = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(fetchUser());

  try {
    const user = await performRetrieveCurrentUser();

    dispatch(fetchUserSuccess(user));
  }
  catch (err) {
    dispatch(fetchUserFailed(err));
  }
};
