import { 
  IRoomsState,
  IAsyncData
} from '../states';
import {
  SimpleRoom,
  DetailedRoom,
} from '../states/rooms';

import { RoomsActions } from '../actions';


const initialAsyncData = <T extends unknown>(): IAsyncData<T> => ({
  isLoading: false,
  err: '',
});

const initialState: IRoomsState = {
  listRooms: initialAsyncData<SimpleRoom[]>(),
  createRoom: initialAsyncData<void>(),
  removeRoom: initialAsyncData<void>(),
  retrieveRoom: initialAsyncData<DetailedRoom>(),
  updateRoom: initialAsyncData<void>(),
  inviteMembers: initialAsyncData<void>(),
  uninviteMembers: initialAsyncData<void>(),
  joinRoom: initialAsyncData<void>(),
  leaveRoom: initialAsyncData<void>(),
};

export default function (state = initialState, action: any): IRoomsState {
  switch (action.type) {
    case RoomsActions.LIST_ROOMS:
      return listRooms(state);
    case RoomsActions.LIST_ROOMS_SUCCESS:
      return listRoomsSuccess(state, action.payload);
    case RoomsActions.LIST_ROOMS_FAILED:
      return listRoomsFailed(state, action.payload);
    
    case RoomsActions.CREATE_ROOM:
      return createRoom(state);
    case RoomsActions.CREATE_ROOM_SUCCESS:
      return createRoomSuccess(state, action.payload);
    case RoomsActions.CREATE_ROOM_FAILED:
      return createRoomFailed(state, action.payload);
    
    case RoomsActions.REMOVE_ROOM:
      console.warn(`REMOVE ROOM Not implemented`);
      return state;
    case RoomsActions.REMOVE_ROOM_SUCCESS:
      console.warn(`REMOVE_ROOM_SUCCESS not implemented`);
      return state;
    case RoomsActions.REMOVE_ROOM_FAILED:
      console.warn(`REMOVE_ROOM_FAILED not implemented`);
      return state;      
    
    case RoomsActions.RETRIEVE_ROOM:
      return retrieveRoom(state);
    case RoomsActions.RETRIEVE_ROOM_SUCCESS:
      return retrieveRoomSuccess(state, action.payload);
    case RoomsActions.RETRIEVE_ROOM_FAILED:
      return retrieveRoomFailed(state, action.payload);
    
    case RoomsActions.UPDATE_ROOM:
      return updateRoom(state);
    case RoomsActions.UPDATE_ROOM_SUCCESS:
      return updateRoomSuccess(state, action.payload);
    case RoomsActions.UPDATE_ROOM_FAILED:
      return updateRoomFailed(state, action.payload);

    case RoomsActions.INVITE_MEMBERS_TO_ROOM:
      return inviteMembersToRoom(state);
    case RoomsActions.INVITE_MEMBERS_TO_ROOM:
      return inviteMembersToRoomSuccess(state, action.payload);
    case RoomsActions.INVITE_MEMBERS_TO_ROOM:
      return inviteMembersToRoomFailed(state, action.payload);

    case RoomsActions.UNINVITE_MEMBERS_FROM_ROOM:
      return uninviteMembersToRoom(state);
    case RoomsActions.UNINVITE_MEMBERS_FROM_ROOM_SUCCESS:
      return uninviteMembersToRoomSuccess(state, action.payload);
    case RoomsActions.UNINVITE_MEMBERS_FROM_ROOM_FAILED:
      return uninviteMembersToRoomFailed(state, action.payload);

    case RoomsActions.JOIN_ROOM:
      return joinRoom(state);
    case RoomsActions.JOIN_ROOM_SUCCESS:
      return joinRoomSuccess(state, action.payload);
    case RoomsActions.JOIN_ROOM_FAILED:
      return joinRoomFailed(state, action.payload);

    case RoomsActions.LEAVE_ROOM:
      return leaveRoom(state);
    case RoomsActions.LEAVE_ROOM_SUCCESS:
      return leaveRoomSuccess(state, action.payload);
    case RoomsActions.LEAVE_ROOM_FAILED:
      return leaveRoomFailed(state, action.payload);
  
    default:
      return state;
  }
}

const listRooms = (state: IRoomsState): IRoomsState => {
  return {
    ...state,
    listRooms: {
      data: undefined,
      isLoading: true,
      err: '',
    }
  };
};
const listRoomsSuccess = (state: IRoomsState, payload: SimpleRoom[]): IRoomsState => {
  const data = payload;
  return {
    ...state,
    listRooms: {
      data,
      isLoading: false,
      err: '',
    }
  };
};
const listRoomsFailed = (state: IRoomsState, payload: string): IRoomsState => {
  const err = payload;
  return {
    ...state,
    listRooms: {
      data: undefined,
      isLoading: false,
      err,
    }
  };
};


const createRoom = (state: IRoomsState): IRoomsState => {
  return {
    ...state,
    createRoom: {
      ...state.createRoom,
      data: undefined,
      isLoading: true,
      err: '',
    }
  };
};
const createRoomSuccess = (state: IRoomsState, payload: SimpleRoom): IRoomsState => {
  const data = payload;
  const roomsData = state.listRooms.data || [];
  return {
    ...state,
    createRoom: {
      ...state.createRoom,
      isLoading: false,
      err: '',
    },
    listRooms: {
      ...state.listRooms,
      data: [...roomsData, data],
    },
  };
};
const createRoomFailed = (state: IRoomsState, payload: string): IRoomsState => {
  const err = payload;
  return {
    ...state,
    createRoom: {
      ...state.createRoom,
      data: undefined,
      isLoading: false,
      err,
    }
  };
};

const retrieveRoom = (state: IRoomsState): IRoomsState => {
  return {
    ...state,
    retrieveRoom: {
      data: undefined,
      isLoading: true,
      err: '',
    },
  };
};
const retrieveRoomSuccess = (state: IRoomsState, payload: DetailedRoom): IRoomsState => {
  const data = payload;
  return {
    ...state,
    retrieveRoom: {
      isLoading: false,
      data,
      err: '',
    },
  };
};
const retrieveRoomFailed = (state: IRoomsState, payload: string): IRoomsState => {
  const err = payload;
  return {
    ...state,
    retrieveRoom: {
      data: undefined,
      isLoading: false,
      err,
    },
  };
};

const updateRoom = (state: IRoomsState) => {
  return {
    ...state,
    updateRoom: {
      isLoading: true,
      data: undefined,
      err: '',
    },
  };
};

const updateRoomSuccess = (state: IRoomsState, payload: SimpleRoom) => {
  const updateRoom = payload;
  const listRooms = state.listRooms.data || [];

  for (let i = 0; i < listRooms.length; i++) {
    if (listRooms[i]._id === updateRoom._id) {
      listRooms[i] = updateRoom;
      break;
    }
  }

  return {
    ...state,
    updateRoom: {
      isLoading: false,
      data: undefined,
      err: '',
    },
  };
};

const updateRoomFailed = (state: IRoomsState, payload: string) => {
  const err = payload;
  return {
    ...state,
    updateRoom: {
      isLoading: false,
      data: undefined,
      err,
    },
  };
};

const inviteMembersToRoom = (state: IRoomsState) => {
  return {
    ...state,
    inviteMembers: {
      isLoading: true,
      data: undefined,
      err: '',
    },
  };
};

const inviteMembersToRoomSuccess = (state: IRoomsState, payload: DetailedRoom) => {
  const data = payload;
  return {
    ...state,
    inviteMembers: {
      isLoading: false,
      data: undefined,
      err: '',
    },
    retrieveRoom: {
      ...state.retrieveRoom,
      data,
    },
  };
};

const inviteMembersToRoomFailed = (state: IRoomsState,  payload: string) => {
  const err = payload;
  return {
    ...state,
    inviteMembers: {
      isLoading: false,
      data: undefined,
      err,
    },
  };
};

const uninviteMembersToRoom = (state: IRoomsState) => {
  return {
    ...state,
    uninviteMembers: {
      isLoading: true,
      data: undefined,
      err: '',
    },
  };
};

const uninviteMembersToRoomSuccess = (state: IRoomsState, payload: DetailedRoom) => {
  const data = payload;
  return {
    ...state,
    uninviteMembers: {
      isLoading: false,
      data: undefined,
      err: '',
    },
    retrieveRoom: {
      ...state.retrieveRoom,
      data,
    },
  };
};

const uninviteMembersToRoomFailed = (state: IRoomsState,  payload: string) => {
  const err = payload;
  return {
    ...state,
    uninviteMembers: {
      isLoading: false,
      data: undefined,
      err,
    },
  };
};


const joinRoom = (state: IRoomsState): IRoomsState => {
  return {
    ...state,
    joinRoom: {
      ...state.joinRoom,
      data: undefined,
      isLoading: true,
      err: '',
    }
  };
};
const joinRoomSuccess = (state: IRoomsState, payload: DetailedRoom): IRoomsState => {
  const data = payload;
  console.log(data);

  return {
    ...state,
    joinRoom: {
      data: undefined,
      isLoading: false,
      err: '',
    },
    retrieveRoom: {
      ...state.retrieveRoom,
      data,
    },
  };
};
const joinRoomFailed = (state: IRoomsState, payload: string): IRoomsState => {
  const err = payload;
  return {
    ...state,
    joinRoom: {
      data: undefined,
      isLoading: false,
      err,
    }
  };
};

const leaveRoom = (state: IRoomsState): IRoomsState => {
  return {
    ...state,
    leaveRoom: {
      ...state.joinRoom,
      data: undefined,
      isLoading: true,
      err: '',
    }
  };
};
const leaveRoomSuccess = (state: IRoomsState, payload: DetailedRoom): IRoomsState => {
  const data = payload;
  return {
    ...state,
    leaveRoom: {
      data: undefined,
      isLoading: false,
      err: '',
    },
    retrieveRoom: {
      ...state.retrieveRoom,
      data,
    },
  };
};
const leaveRoomFailed = (state: IRoomsState, payload: string): IRoomsState => {
  const err = payload;
  return {
    ...state,
    leaveRoom: {
      data: undefined,
      isLoading: false,
      err,
    },
  };
};

