import { IRoomsState } from '../states';
import { RoomsActions } from '../actions';


const initialState: IRoomsState = {
  rooms: {
    isLoading: false,
    err: '',
  },
  createRoom: {
    isLoading: false,
    err: '',
  },
  room: {
    isLoading: false,
    err: '',
  },
  joinRoom: {
    isLoading: false,
    err: '',
  }
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
    
    case RoomsActions.RETRIEVE_ROOM:
      return retrieveRoom(state);
    case RoomsActions.RETRIEVE_ROOM_SUCCESS:
      return retrieveRoomSuccess(state, action.payload);
    case RoomsActions.RETRIEVE_ROOM_FAILED:
      return retrieveRoomFailed(state, action.payload);
    
    case RoomsActions.JOIN_ROOM:
      return joinRoom(state);
    case RoomsActions.JOIN_ROOM_SUCCESS:
      let y = joinRoomSuccess(state, action.payload);
      console.log('success', y);
      return y;
    case RoomsActions.JOIN_ROOM_FAILED:
      let x = joinRoomFailed(state, action.payload);
      console.log('failed', x);
      return x;
    
    default:
      return state;
  }
}

const listRooms = (state: IRoomsState): IRoomsState => {
  return {
    ...state,
    rooms: {
      ...state.rooms,
      data: undefined,
      isLoading: true,
      err: '',
    }
  };
};
const listRoomsSuccess = (state: IRoomsState, payload: any): IRoomsState => {
  const data = payload.rooms;
  return {
    ...state,
    rooms: {
      ...state.rooms,
      data,
      isLoading: false,
      err: '',
    }
  };
};
const listRoomsFailed = (state: IRoomsState, payload: any): IRoomsState => {
  const err = payload;
  return {
    ...state,
    rooms: {
      ...state.rooms,
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
const createRoomSuccess = (state: IRoomsState, payload: any): IRoomsState => {
  const data = payload;
  const roomsData = state.rooms.data || [];
  return {
    ...state,
    createRoom: {
      ...state.createRoom,
      isLoading: false,
      data,
      err: '',
    },
    rooms: {
      ...state.rooms,
      data: [...roomsData, data],
    },
  };
};
const createRoomFailed = (state: IRoomsState, payload: any): IRoomsState => {
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
    room: {
      ...state.createRoom,
      data: undefined,
      isLoading: true,
      err: '',
    },
  };
};
const retrieveRoomSuccess = (state: IRoomsState, payload: any): IRoomsState => {
  const data = payload;
  const roomsData = state.rooms.data || [];
  return {
    ...state,
    room: {
      ...state.createRoom,
      isLoading: false,
      data,
      err: '',
    },
    rooms: {
      ...state.rooms,
      data: [...roomsData, data],
    },
  };
};
const retrieveRoomFailed = (state: IRoomsState, payload: any): IRoomsState => {
  const err = payload;
  return {
    ...state,
    room: {
      ...state.createRoom,
      data: undefined,
      isLoading: false,
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
const joinRoomSuccess = (state: IRoomsState, payload: any): IRoomsState => {
  const data = payload;
  return {
    ...state,
    joinRoom: {
      data,
      isLoading: false,
      err: '',
    }
  };
};
const joinRoomFailed = (state: IRoomsState, payload: any): IRoomsState => {
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