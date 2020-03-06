import {
  listRooms as performListRooms,
  createRoom as performCreateRoom,
  removeRoom as performRemoveRoom,
  retrieveRoom as performRetrieveRoom,
  inviteMemberToRoom as performInviteMemberToRoom,
  uninviteMemberFromRoom as performUninviteMemberFromRoom,
} from 'src/service';

export const LIST_ROOMS = 'LIST_ROOMS';
export const LIST_ROOMS_SUCCESS = 'LIST_ROOMS_SUCCESS';
export const LIST_ROOMS_FAILED = 'LIST_ROOMS_FAILED';

export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILED = 'CREATE_ROOM_FAILED';



export const listRooms = () => ({
  type: LIST_ROOMS,
});
export const listRoomsSuccess = (response: any) => ({
  type: LIST_ROOMS_SUCCESS,
  payload: response,
});
export const listRoomsFailed = (err: any) => ({
  type: LIST_ROOMS_FAILED,
  payload: err,
});

export const createRoom = (name: string, isPrivate: boolean) => ({
  type: CREATE_ROOM,
  payload: { name, isPrivate },
});
export const createRoomSuccess = (response: any) => ({
  type: CREATE_ROOM_SUCCESS,
  payload: response,
});
export const createRoomFailed = (err: any) => ({
  type: CREATE_ROOM_FAILED,
  payload: err,
});



export const listRoomsThunk = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(listRooms());

  try {
    const rooms = await performListRooms();
    dispatch(listRoomsSuccess(rooms));
  }
  catch (err) {
    dispatch(listRoomsFailed(err));
  }
};

export const createRoomThunk = (name: string, isPrivate: boolean) => async (dispatch: React.Dispatch<any>) => {
  dispatch(createRoom(name, isPrivate));

  try {
    const response = await performCreateRoom(name, isPrivate);
    const { room, err } = response;
    if (err) {
      dispatch(createRoomFailed(err));
    }
    else {
      dispatch(createRoomSuccess(room));
    }
  }
  catch (err) {
    dispatch(createRoomFailed(err));
  }
};