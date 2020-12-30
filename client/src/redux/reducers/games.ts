import {
    IGamesState,
    IAsyncData,
} from '../states';
import {
    GameType,
} from '../states/games';
import { GamesActions } from '../actions';

const initialAsyncData = <T extends unknown>(): IAsyncData<T> => ({
    isLoading: false,
    err: '',
});

const initialState: IGamesState = {
    listGames: initialAsyncData<GameType[]>(),
};

export default function (state = initialState, action: any): IGamesState {
    switch (action.type) {
        case GamesActions.LIST_GAMES:
            return listGames(state);
        case GamesActions.LIST_GAMES_SUCCESS:
            return listGamesSuccess(state, action.payload);
        case GamesActions.LIST_GAMES_FAILED:
            return listGamesFailed(state, action.payload);
        default:
            return state;
    }
};

const listGames = (state: IGamesState): IGamesState => {
    return {
        ...state,
        listGames: {
            data: undefined,
            isLoading: true,
            err: '',
        },
    };
};
const listGamesSuccess = (state: IGamesState, payload: GameType[]): IGamesState => {
    const data = payload;
    return {
        ...state,
        listGames: {
            data,
            isLoading: false,
            err: '',
        },
    };
};
const listGamesFailed = (state: IGamesState, payload: string): IGamesState => {
    const err = payload;
    return {
        ...state,
        listGames: {
            data: undefined,
            isLoading: false,
            err,
        },
    };
};


  
