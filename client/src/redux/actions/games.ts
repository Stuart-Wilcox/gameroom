import {
    listGames as performListGames,
    listActiveGames as performListActiveGames,
    createGame as peformCreateGame,
    removeGame as performRemoveGame,
    updateGame as performUpdateGame,
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