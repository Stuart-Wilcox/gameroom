import {
  listRooms as performListRooms,
  createRoom as performCreateRoom,
  removeRoom as performRemoveRoom,
  retrieveRoom as performRetrieveRoom,
  updateRoom as performUpdateRoom,
  inviteMembersToRoom as performInviteMembersToRoom,
  uninviteMembersFromRoom as performUninviteMembersFromRoom,
  joinRoom as performJoinRoom,
  leaveRoom as performLeaveRoom,
} from 'src/service';

export const LIST_ROOMS = 'LIST_ROOMS';
export const LIST_ROOMS_SUCCESS = 'LIST_ROOMS_SUCCESS';
export const LIST_ROOMS_FAILED = 'LIST_ROOMS_FAILED';

export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILED = 'CREATE_ROOM_FAILED';

export const REMOVE_ROOM = 'REMOVE_ROOM';
export const REMOVE_ROOM_SUCCESS = 'REMOVE_ROOM_SUCCESS';
export const REMOVE_ROOM_FAILED = 'REMOVE_ROOM_FAILED';

export const RETRIEVE_ROOM = 'RETRIEVE_ROOM';
export const RETRIEVE_ROOM_SUCCESS = 'RETRIEVE_ROOM_SUCCESS';
export const RETRIEVE_ROOM_FAILED = 'RETRIEVE_ROOM_FAILED';

export const UPDATE_ROOM = 'UPDATE_ROOM';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const UPDATE_ROOM_FAILED = 'UPDATE_ROOM_FAILED';

export const INVITE_MEMBERS_TO_ROOM = 'INVITE_MEMBERS_TO_ROOM';
export const INVITE_MEMBERS_TO_ROOM_SUCCESS = 'INVITE_MEMBERS_TO_ROOM_SUCCESS';
export const INVITE_MEMBERS_TO_ROOM_FAILED = 'INVITE_MEMBERS_TO_ROOM_FAILED';

export const UNINVITE_MEMBERS_FROM_ROOM = 'UNINVITE_MEMBERS_FROM_ROOM';
export const UNINVITE_MEMBERS_FROM_ROOM_SUCCESS = 'UNINVITE_MEMBERS_FROM_ROOM_SUCCESS';
export const UNINVITE_MEMBERS_FROM_ROOM_FAILED = 'UNINVITE_MEMBERS_FROM_ROOM_FAILED';

export const JOIN_ROOM = 'JOIN_ROOM';
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS';
export const JOIN_ROOM_FAILED = 'JOIN_ROOM_FAILED';

export const LEAVE_ROOM = 'LEAVE_ROOM';
export const LEAVE_ROOM_SUCCESS = 'LEAVE_ROOM_FAILED';
export const LEAVE_ROOM_FAILED = 'LEAVE_ROOM_FAILED';


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

export const createRoom = (name: string) => ({
  type: CREATE_ROOM,
  payload: { name },
});
export const createRoomSuccess = (response: any) => ({
  type: CREATE_ROOM_SUCCESS,
  payload: response,
});
export const createRoomFailed = (err: any) => ({
  type: CREATE_ROOM_FAILED,
  payload: err,
});

export const removeRoom = (id: string) => ({
  type: REMOVE_ROOM,
  payload: { id },
});
export const removeRoomSuccess = (response: any) => ({
  type: REMOVE_ROOM_SUCCESS,
  payload: response,
});
export const removeRoomFailed = (err: any) => ({
  type: REMOVE_ROOM_FAILED,
  payload: err,
});

export const retrieveRoom = (id: string) => ({
  type: RETRIEVE_ROOM,
  payload: { id },
});
export const retrieveRoomSuccess = (response: any) => ({
  type: RETRIEVE_ROOM_SUCCESS,
  payload: response,
});
export const retrieveRoomFailed = (err: any) => ({
  type: RETRIEVE_ROOM_FAILED,
  payload: err,
});

export const updateRoom = (id: string, name?: string, isPrivate?: boolean) => ({
  type: UPDATE_ROOM,
  payload: { id, name, isPrivate },
});
export const updateRoomSuccess = (response: any) => ({
  type: UPDATE_ROOM_SUCCESS,
  payload: response,
});
export const updateRoomFailed = (err: any) => ({
  type: UPDATE_ROOM_FAILED,
  payload: err,
});

export const inviteMembersToRoom = (id: string, users: string[]) => ({
  type: INVITE_MEMBERS_TO_ROOM,
  payload: { id, users },
});
export const inviteMembersToRoomSuccess = (response: any) => ({
  type: INVITE_MEMBERS_TO_ROOM_SUCCESS,
  payload: response,
});
export const inviteMembersToRoomFailed = (err: any) => ({
  type: INVITE_MEMBERS_TO_ROOM_FAILED,
  payload: err,
});

export const uninviteMembersFromRoom = (id: string, users: string[]) => ({
  type: UNINVITE_MEMBERS_FROM_ROOM,
  payload: { id, users },
});
export const uninviteMembersFromRoomSuccess = (response: any) => ({
  type: UNINVITE_MEMBERS_FROM_ROOM_SUCCESS,
  payload: response,
});
export const uninviteMembersFromRoomFailed = (err: any) => ({
  type: UNINVITE_MEMBERS_FROM_ROOM_FAILED,
  payload: err,
});

export const joinRoom = (roomId: string) => ({
  type: JOIN_ROOM,
  payload: { roomId },
});
export const joinRoomSuccess = (response: any) => ({
  type: JOIN_ROOM_SUCCESS,
  payload: response,
});
export const joinRoomFailed = (err: any) => ({
  type: JOIN_ROOM_FAILED,
  payload: err,
});

export const leaveRoom = (roomId: string) => ({
  type: LEAVE_ROOM,
  payload: { roomId },
});
export const leaveRoomSuccess = (response: any) => ({
  type: LEAVE_ROOM_SUCCESS,
  payload: response,
});
export const leaveRoomFailed = (err: any) => ({
  type: LEAVE_ROOM_FAILED,
  payload: err,
});


export const listRoomsThunk = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(listRooms());

  try {
    const { rooms } = await performListRooms();
    dispatch(listRoomsSuccess(rooms));
  }
  catch (err) {
    dispatch(listRoomsFailed(err));
  }
};

export const createRoomThunk = (name: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(createRoom(name));

  try {
    const response = await performCreateRoom(name);
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

export const removeRoomThunk = (id: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(removeRoom(id));

  try {
    const response = await performRemoveRoom(id);
    const { room, err } = response;
    if (err) {
      dispatch(removeRoomFailed(err));
    }
    else {
      dispatch(removeRoomSuccess(room));
    }
  }
  catch (err) {
    dispatch(removeRoomFailed(err));
  }
};

export const retrieveRoomThunk = (id: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(retrieveRoom(id));

  try {
    const response = await performRetrieveRoom(id);
    const { room, err } = response;
    if (err) {
      dispatch(retrieveRoomFailed(err));
    }
    else {
      dispatch(retrieveRoomSuccess(room));
    }
  }
  catch (err) {
    dispatch(retrieveRoomFailed(err));
  }
};

export const updateRoomThunk = (id: string, name?: string, isPrivate?: boolean) => async (dispatch: React.Dispatch<any>) => {
  dispatch(updateRoom(id, name, isPrivate));

  try {
    const response = await performUpdateRoom(id, name, isPrivate);
    const { room, err } = response;
    if (err) {
      dispatch(updateRoomFailed(err));
    }
    else {
      dispatch(updateRoomSuccess(room));
    }
  }
  catch (err) {
    dispatch(updateRoomFailed(err));
  }
};

export const inviteMemberToRoomThunk = (id: string, users: string[]) => async (dispatch: React.Dispatch<any>) => {
  dispatch(inviteMembersToRoom(id, users));

  try {
    const response = await performInviteMembersToRoom(id, users);
    const { room, err } = response;
    if (err) {
      dispatch(inviteMembersToRoomFailed(err));
    }
    else {
      dispatch(inviteMembersToRoomSuccess(room));
    }
  }
  catch (err) {
    dispatch(inviteMembersToRoomFailed(err));
  }
};

export const uninviteMemberFromRoomThunk = (id: string, users: string[]) => async (dispatch: React.Dispatch<any>) => {
  dispatch(uninviteMembersFromRoom(id, users));

  try {
    const response = await performUninviteMembersFromRoom(id, users);
    const { room, err } = response;
    if (err) {
      dispatch(uninviteMembersFromRoomFailed(err));
    }
    else {
      dispatch(uninviteMembersFromRoomSuccess(room));
    }
  }
  catch (err) {
    dispatch(uninviteMembersFromRoomFailed(err));
  }
};

export const joinRoomThunk = (roomId: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(joinRoom(roomId));

  try {
    const { room, err } = await performJoinRoom(roomId);

    if (err) {
      console.log(err);
      dispatch(joinRoomFailed(err));
    }
    else {
      dispatch(joinRoomSuccess(room));
    }
  }
  catch (err) {
    console.log(err);
    dispatch(joinRoomFailed(err));
  }
};

export const leaveRoomThunk = (roomId: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(leaveRoom(roomId));

  try {
    const { room, err } = await performLeaveRoom(roomId);

    if (err) {
      dispatch(leaveRoomFailed(err));
    }
    else {
      dispatch(leaveRoomSuccess(room));
    }
  }
  catch (err) {
    dispatch(leaveRoomFailed(err));
  }
};
