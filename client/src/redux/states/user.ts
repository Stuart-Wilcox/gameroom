import IAsyncData from './IAsyncData';

export default interface IState {
  currentUser: IAsyncData<any>;
};

export interface SimpleUser {
  _id: string;
  username: string;
};