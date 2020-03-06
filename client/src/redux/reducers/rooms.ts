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
  const data = payload;
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