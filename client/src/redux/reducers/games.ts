import {
    IGamesState,
    IAsyncData,
} from '../states';
import {
    GameType,
    Game,
} from '../states/games';
import { GamesActions } from '../actions';

const initialAsyncData = <T extends unknown>(): IAsyncData<T> => ({
    isLoading: false,
    err: '',
});

const initialState: IGamesState = {
    listGames: initialAsyncData<GameType[]>(),
    createGame: initialAsyncData<GameType>(),
    retrieveGame: initialAsyncData<Game>(),
};

export default function (state = initialState, action: any): IGamesState {
    switch (action.type) {
        case GamesActions.LIST_GAMES:
            return listGames(state);
        case GamesActions.LIST_GAMES_SUCCESS:
            return listGamesSuccess(state, action.payload);
        case GamesActions.LIST_GAMES_FAILED:
            return listGamesFailed(state, action.payload);

        case GamesActions.CREATE_GAME:
            return createGame(state);
        case GamesActions.CREATE_GAME_SUCCESS:
            return createGameSuccess(state, action.payload);
        case GamesActions.CREATE_GAME_FAILED:
            return createGameFailed(state, action.payload);
 
        case GamesActions.RETRIEVE_GAME:
            return retrieveGame(state);
        case GamesActions.RETRIEVE_GAME_SUCCESS:
            return retrieveGameSuccess(state, action.payload);
        case GamesActions.RETRIEVE_GAME_FAILED:
            return retrieveGameFailed(state, action.payload);
    
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


const createGame = (state: IGamesState): IGamesState => {
    return {
        ...state,
        createGame: {
            data: undefined,
            isLoading: true,
            err: '',
        }
    }
};
const createGameSuccess = (state: IGamesState, payload: any): IGamesState => {
    const data = payload;
    return {
        ...state,
        createGame: {
            isLoading: false,
            data,
            err: '',
        }
    }
};
const createGameFailed = (state: IGamesState, payload: string): IGamesState => {
    const err = payload;
    return {
        ...state,
        createGame: {
            isLoading: false,
            data: undefined,
            err,
        }
    }
};

const retrieveGame = (state: IGamesState): IGamesState => {
    return {
        ...state,
        retrieveGame: {
            data: undefined,
            isLoading: true,
            err: '',
        },
    };
};
const retrieveGameSuccess = (state: IGamesState, payload: Game): IGamesState => {
    const data = payload;
    return {
        ...state,
        retrieveGame: {
            data,
            isLoading: false,
            err: '',
        },
    };
};
const retrieveGameFailed = (state: IGamesState, payload: string): IGamesState => {
    const err = payload;
    return {
        ...state,
        retrieveGame: {
            data: undefined,
            isLoading: false,
            err,
        },
    };
};