import IAsyncData from './IAsyncData';

export default interface IState {
  rooms: IAsyncData<any>;
  createRoom: IAsyncData<any>;
  joinRoom: IAsyncData<any>;
  room: IAsyncData<any>;
};

export interface Room {
  id: string;
  name: string;
  creator: any;
  created: string;
}