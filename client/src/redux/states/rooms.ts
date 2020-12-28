import IAsyncData from './IAsyncData';
import { SimpleUser } from './user';

export default interface IState {
  listRooms: IAsyncData<SimpleRoom[]>;
  createRoom: IAsyncData<void>;
  removeRoom: IAsyncData<void>;
  retrieveRoom: IAsyncData<DetailedRoom>;
  updateRoom: IAsyncData<void>;
  inviteMembers: IAsyncData<void>;
  uninviteMembers: IAsyncData<void>;
  joinRoom: IAsyncData<void>;
  leaveRoom: IAsyncData<void>;
};


export interface SimpleRoom {
  _id: string;
  isActive: string,
  name: string;
  creator: SimpleUser;
  created: string;
};

export interface DetailedRoom {
  _id: string;
  isActive: boolean;
  invitedMembers: SimpleUser[];
  currentMembers: SimpleUser[];
  name: string;
  creator: SimpleUser;
  created: string;
};