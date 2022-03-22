import {
    listGames as performListGames,
    listActiveGames as performListActiveGames,
    createGame as performCreateGame,
    removeGame as performRemoveGame,
    updateGame as performUpdateGame,
    retrieveGame as performRetrieveGame,
} from 'src/service';

export const LIST_GAMES = 'LIST_GAMES';
export const LIST_GAMES_SUCCESS = 'LIST_GAMES_SUCCESS';
export const LIST_GAMES_FAILED = 'LIST_GAMES_FAILED';

export const LIST_ACTIVE_GAMES = 'LIST_ACTIVE_GAMES';
export const LIST_ACTIVE_GAMES_SUCCESS = 'LIST_ACTIVE_GAMES_SUCCESS';
export const LIST_ACTIVE_GAMES_FAILED = 'LIST_ACTIVE_GAMES_FAILED';

export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const CREATE_GAME_FAILED = 'CREATE_GAME_FAILED';

export const REMOVE_GAME = 'REMOVE_GAME';
export const REMOVE_GAME_SUCCESS = 'REMOVE_GAME_SUCCESS';
export const REMOVE_GAME_FAILED = 'REMOVE_GAME_FAILED';

export const UPDATE_GAME = 'UPDATE_GAME';
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS';
export const UPDATE_GAME_FAILED = 'UPDATE_GAME_FAILED';

export const RETRIEVE_GAME = 'RETRIEVE_GAME';
export const RETRIEVE_GAME_SUCCESS = 'RETRIEVE_GAME_SUCCESS';
export const RETRIEVE_GAME_FAILED = 'RETRIEVE_GAME_FAILED';

export const listGames = () => ({
    type: LIST_GAMES,
});
export const listGamesSuccess = (response: any) => ({
    type: LIST_GAMES_SUCCESS,
    payload: response,
});
export const listGamesFailed = (error: any) => ({
    type: LIST_GAMES_FAILED,
    payload: error,
});

export const listActiveGames = () => ({
    type: LIST_ACTIVE_GAMES,
});
export const listActiveGamesSuccess = (response: any) => ({
    type: LIST_ACTIVE_GAMES_SUCCESS,
    payload: response,
});
export const listActiveGamesFailed = (error: any) => ({
    type: LIST_ACTIVE_GAMES_FAILED,
    payload: error,
});

export const createGame = () => ({
    type: CREATE_GAME,
});
export const createGameSuccess = (response: any) => ({
    type: CREATE_GAME_SUCCESS,
    payload: response,
});
export const createGameFailed = (error: any) => ({
    type: CREATE_GAME_FAILED,
    payload: error,
});

export const removeGame = () => ({
    type: REMOVE_GAME,
});
export const removeGameSuccess = (response: any) => ({
    type: REMOVE_GAME_SUCCESS,
    payload: response,
});
export const removeGameFailed = (error: any) => ({
    type: REMOVE_GAME_FAILED,
    payload: error,
});

export const updateGame = () => ({
    type: UPDATE_GAME,
});
export const updateGameSuccess = (response: any) => ({
    type: UPDATE_GAME_SUCCESS,
    payload: response,
});
export const updateGameFailed = (error: any) => ({
    type: UPDATE_GAME_FAILED,
    payload: error,
});

export const retrieveGame = () => ({
    type: RETRIEVE_GAME,
});
export const retrieveGameSuccess = (response: any) => ({
    type: RETRIEVE_GAME_SUCCESS,
    payload: response,
});
export const retrieveGameFailed = (error: any) => ({
    type: RETRIEVE_GAME,
    payload: error,
});


export const listGamesThunk = () => async (dispatch: React.Dispatch<any>) => {
    dispatch(listGames());

    try {
        const { games } = await performListGames();
        dispatch(listGamesSuccess(games));
    }
    catch (error) {
        dispatch(listGamesFailed(error));
    }
};

export const createGameThunk = (roomId: string, name: string, gameTypeId: string, gameSettings: any) => async (dispatch: React.Dispatch<any>) => {
    dispatch(createGame());

    try {
        const { game } = await performCreateGame(roomId, name, gameTypeId, gameSettings);
        dispatch(createGameSuccess(game));
    }
    catch (error) {
        dispatch(createGameFailed(error));
    }
};

export const retrieveGameThunk = (gameId: string) => async (dispatch: React.Dispatch<any>) => {
    dispatch(retrieveGame());

    try {
        const { game } = await performRetrieveGame(gameId);
        dispatch(retrieveGameSuccess(game));
    }
    catch (error) {
        dispatch(retrieveGameFailed(error));
    }
};
