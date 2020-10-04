import * as React from 'react';
import {
  retrieveCurrentUser as performRetrieveCurrentUser,
  searchUsers as performSearchUsers,
} from 'src/service';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const SEARCH_USERS = 'SEARCH_USERS';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILED = 'SEARCH_USERS_FAILED';


export const fetchUser = () => ({
  type: FETCH_USER,
});
export const fetchUserSuccess = (user: any) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});
export const fetchUserFailed = (err: any) => ({
  type: FETCH_USER_FAILED,
  payload: err,
});

export const searchUsers = (username: string) => ({
  type: SEARCH_USERS,
  payload: username,
});
export const searchUsersSuccess = (results: any) => ({
  type: SEARCH_USERS_SUCCESS,
  payload: results,
});
export const searchUsersFailed = (error: any) => ({
  type: SEARCH_USERS_FAILED,
  payload: error,
});

export const fetchUserThunk = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(fetchUser());

  try {
    const { user } = await performRetrieveCurrentUser();

    dispatch(fetchUserSuccess(user));
  }
  catch (err) {
    dispatch(fetchUserFailed(err));
  }
};

export const searchUsersThunk = (username: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(searchUsers(username));

  try {
    const { users } = await performSearchUsers(username);
    dispatch(searchUsersSuccess(users));
  }
  catch (err) {
    dispatch(searchUsersFailed(err));
  }
};