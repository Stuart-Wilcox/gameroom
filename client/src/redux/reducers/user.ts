import {
    IAsyncData,
    IUserState,
} from '../states';
import {
    SimpleUser
} from '../states/user';

import {
    UserActions,
} from '../actions'

const initialAsyncData = <T extends unknown>(): IAsyncData<T> => ({
    isLoading: false,
    err: '',
});

const initialState: IUserState = {
    currentUser: initialAsyncData<SimpleUser>(),
    userSearch: initialAsyncData<SimpleUser[]>(),
};

export default function (state = initialState, action: any): IUserState {
    switch (action.type) {
        case UserActions.FETCH_USER:
            return fetchUser(state);
        case UserActions.FETCH_USER_SUCCESS:
            return fetchUserSuccess(state, action.payload);
        case UserActions.FETCH_USER_FAILED:
            return fetchUserFailed(state, action.payload);
        case UserActions.SEARCH_USERS:
            return searchUsers(state);
        case UserActions.SEARCH_USERS_SUCCESS:
            return searchUsersSuccess(state, action.payload);
        case UserActions.SEARCH_USERS_FAILED:
            return searchUsersFailed(state, action.payload);
        default:
            return state;
    }
};

const fetchUser = (state: IUserState): IUserState => {
    return {
        ...state,
        currentUser: {
            isLoading: true,
            data: undefined,
            err: '',
        }
    };
};

const fetchUserSuccess = (state: IUserState, payload: SimpleUser): IUserState => {
    const data = payload;
    return {
        ...state,
        currentUser: {
            isLoading: false,
            data,
            err: '',
        }
    };
};

const fetchUserFailed = (state: IUserState, payload: string): IUserState => {
    const err = payload;
    return {
        ...state,
        currentUser: {
            isLoading: false,
            data: undefined,
            err,
        }
    };
};

const searchUsers = (state: IUserState): IUserState => {
    return {
        ...state,
        userSearch: {
            isLoading: true,
            data: undefined,
            err: '',
        }
    };
};

const searchUsersSuccess = (state: IUserState, payload: SimpleUser[]): IUserState => {
    return {
        ...state,
        userSearch: {
            isLoading: false,
            data: payload,
            err: '',
        }
    };
};

const searchUsersFailed = (state: IUserState, payload: string): IUserState => {
    return {
        ...state,
        userSearch: {
            isLoading: false,
            data: undefined,
            err: payload,
        }
    };
};