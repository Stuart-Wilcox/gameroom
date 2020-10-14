import sendRequest from './api.base';
import { baseURL } from './api.base';

export const listRooms = async () => {
  const url = `${baseURL}/api/rooms/`;
  return sendRequest(url, 'GET');
};

export const createRoom = async (name: string) => {
  const url = `${baseURL}/api/rooms/`;
  const body = { name };
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

export const inviteMembersToRoom = async (roomId: string, users: string[]) => {
  const url = `${baseURL}/api/rooms/${roomId}/inviteMembers`;
  const body = { users };
  return sendRequest(url, 'PUT', body);
};

export const uninviteMembersFromRoom = async (roomId: string, users: string[]) => {
  const url = `${baseURL}/api/rooms/${roomId}/uninviteMembers`;
  const body = { users };
  return sendRequest(url, 'PUT', body);
};

export const joinRoom = async (id: string) => {
  const url = `${baseURL}/api/rooms/${id}/join`;
  return sendRequest(url, 'POST');
};

export const leaveRoom = async (id: string) => {
  const url = `${baseURL}/api/rooms/${id}/leave`;
  return sendRequest(url, 'POST');
};
