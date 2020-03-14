import sendRequest from './api.base';
import { baseURL } from './api.base';

export const listRooms = async () => {
  const url = `${baseURL}/api/rooms/`;
  return sendRequest(url, 'GET');
};

export const createRoom = async (name: string, isPrivate: boolean) => {
  const url = `${baseURL}/api/rooms/`;
  const body = { name, isPrivate };
  return sendRequest(url, 'POST', body);
};

export const removeRoom = async (id: string) => {
  const url = `${baseURL}/api/rooms/${id}`;
  return sendRequest(url, 'DELETE');
};

export const retrieveRoom = async (id: string) => {
  const url = `${baseURL}/api/rooms/${id}`;
  return sendRequest(url, 'GET');
};

export const updateRoom = async (id: string, name?: string, isPrivate?: boolean) => {
  const url = `${baseURL}/api/rooms/${id}`;
  const body = { name, isPrivate };
  return sendRequest(url, 'PUT', body);
};

export const inviteMemberToRoom = async (roomId: string, userId: string) => {
  const url = `${baseURL}/api/rooms/${roomId}/inviteMember`;
  const body = { userId };
  return sendRequest(url, 'PUT', body);
};

export const uninviteMemberFromRoom = async (roomId: string, userId: string) => {
  const url = `${baseURL}/api/rooms/${roomId}/uninviteMember`;
  const body = { userId };
  return sendRequest(url, 'PUT', body);
};

export const joinRoom = async (id: string) => {
  const url = `${baseURL}/api/rooms/${id}/join`;
  return sendRequest(url, 'POST');
};

export const leaveRoom = async (id: string) => {
  const url = `${baseURL}/api/rooms/${id}/leave`;
  return sendRequest(url, 'PUT');
};
