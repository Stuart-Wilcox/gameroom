import sendRequest from './api.base';
import { baseURL } from './api.base';

export const searchUsers = async (username?: string) => {
  const query = !!username ? `?username=${username}` : '';
  const url = `${baseURL}/api/users${query}`;
  return sendRequest(url, 'GET');
};