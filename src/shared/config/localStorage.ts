export interface IStorageItem {
  key: any;
  value: any;
}

export class StorageItem {
  key: any;
  value: any;

  constructor(data: IStorageItem) {
    this.key = data.key;
    this.value = data.value;
  }
}

export const LocalStorage = {
  add(key: string, item: string) {
    localStorage.setItem(key, item);
  },
  get(key: string) {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
