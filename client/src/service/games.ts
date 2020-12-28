import sendRequest from './api.base';
import { baseURL } from './api.base';

export const listGames = async () => {
  const url = `${baseURL}/api/games`;
  return sendRequest(url, 'GET');
};

export const createGame = async (room: string, name: string, gameSettings: any) => {
  const url = `${baseURL}/api/games`;
  const body = { room, name, gameSettings };
  return sendRequest(url, 'POST', body);
};

export const removeGame = async (id: string) => {
  const url = `${baseURL}/api/games/${id}`;
  return sendRequest(url, 'DELETE');
};

export const retrieveGame = async (id: string) => {
  const url = `${baseURL}/api/games/${id}`;
  return sendRequest(url, 'GET');
};

export const updateGame = async (id: string, name?: string, gameSettings?: any) => {
  const url = `${baseURL}/api/games/${id}`;
  const body = { name, gameSettings };
  return sendRequest(url, 'PUT', body);
};