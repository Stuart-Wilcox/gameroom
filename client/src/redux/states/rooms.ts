import IAsyncData from './IAsyncData';

export default interface IState {
  rooms: IAsyncData<Room>;
  createRoom: IAsyncData<CreateRoom>;
  joinRoom: IAsyncData<JoinRoom>;
  room: IAsyncData<any>;
};


export interface Room {
  id: string;
  name: string;
  creator: any;
  created: string;
};

export interface CreateRoom {
  name: string;
};

export interface JoinRoom {
  id: string;
};