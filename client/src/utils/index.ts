import { SimpleUser } from 'src/redux/states/user';

export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const formatDate = (date: Date | string) => {
  if (typeof(date) === 'string') {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    return ''; // invalid date
  }

  return date.toLocaleDateString();
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    window.navigator.clipboard.writeText(text);
    return true;
  }
  catch (error) {
    return false;
  }
};

export const debounce = (func: any, timeout: number) => {
  let isCalled = false;
  let delay: null | number = null;

  // run only as often as timeout
  const run = (...args: any) => {
    if (!isCalled) {
      isCalled = true;
      func(...args);
    }
    
    if (delay !== null) {
      clearTimeout(delay);
    }

    delay = setTimeout(() => {
      isCalled = false;
      run();
    }, timeout);
  };

  return run;
};

class StorageItem {
  key: string;
  constructor(key: string) { this.key = key; }

  set(value: string){ sessionStorage.setItem(this.key, value); }
  get(){ return sessionStorage.getItem(this.key); }
  delete(){ sessionStorage.removeItem(this.key); }
};

export class Token {
  private static storageItem: StorageItem = new StorageItem('token');;

  static set(token: string) { this.storageItem.set(token) }
  static get() { return this.storageItem.get(); }
  static delete() { this.storageItem.delete(); } 
};

export class User extends StorageItem {
  private static storageItem: StorageItem = new StorageItem('user');;

  static set(user: SimpleUser) { this.storageItem.set(JSON.stringify(user)) }
  static get(): SimpleUser { return JSON.parse(this.storageItem.get() || '') as SimpleUser; }
  static delete() { this.storageItem.delete(); } 
};