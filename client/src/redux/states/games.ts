import IAsyncData from './IAsyncData';
import { SimpleUser } from './user';

export default interface IState {
    listGames: IAsyncData<GameType[]>;
};

export interface GameType {
    _id: string,
    name: string;
    allGameSettings: any;
};