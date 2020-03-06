import sendRequest from './api.base';
import { baseURL } from './api.base';

export const login = async (username: string, email: string) => {
  const url = `${baseURL}/api/login`;
  const body = { username, email };
  return sendRequest(url, 'POST', body);
};

export const logout = async (username: string) => {
  const url = `${baseURL}/api/logout`;
  const body = { username };
  return sendRequest(url, 'POST', body);
};

export const submitMFAToken = async (username: string, mfaToken: string) => {
  const url = `${baseURL}/api/mfa`;
  const body = { username, mfaToken };
  return sendRequest(url, 'POST', body);
};