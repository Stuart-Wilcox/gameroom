import IAsyncData from './IAsyncData';
import { SimpleUser } from './user';

export default interface IState {
    listGames: IAsyncData<GameType[]>;
    createGame: IAsyncData<GameType>;
    retrieveGame: IAsyncData<Game>;
};

export interface GameType {
    _id: string,
    name: string;
    allGameSettings: any;
};

export interface Game {
    _id: string;
    created: Date;
    name: string;
    players: SimpleUser[];
    room: string;
    gameType: string;
    gameSettings: any;
    isActive: boolean;
}