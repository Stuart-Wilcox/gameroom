import IAsyncData from './IAsyncData';

export default interface IState {
  rooms: IAsyncData<any>;
  createRoom: IAsyncData<any>;
};