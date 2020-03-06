export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
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

  static set(user: any) { this.storageItem.set(JSON.stringify(user)) }
  static get() { return JSON.parse(this.storageItem.get() || ''); }
  static delete() { this.storageItem.delete(); } 
};