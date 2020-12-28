import { Token } from 'src/utils';

export const baseURL = process.env.PRODUCTION ? '' : 'http://localhost:8080';

const sendRequest = async (url: string, method: string, bodyObj?: any) => {
  const body = JSON.stringify(bodyObj);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token.get()}`,
  };
  
  const response = await fetch(url, { method, body, headers });

  // unauthorized redirect to login
  if (response.status === 401) {
    window.location.href = '/login';
  }

  return response.json();
};

export default sendRequest;