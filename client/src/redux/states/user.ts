import IAsyncData from './IAsyncData';

export default interface IState {
  currentUser: IAsyncData<SimpleUser>;
  userSearch: IAsyncData<SimpleUser[]>;
};

export interface SimpleUser {
  _id: string;
  username: string;
  currentRoom: string;
};