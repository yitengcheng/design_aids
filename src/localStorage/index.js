import { isJsonString } from "../utils";

export const getStorage = (key) => {
  const storage = window.localStorage.getItem(key);
  if (isJsonString(storage)) {
    const obj = JSON.parse(storage);
    return obj?.data;
  } else {
    return storage;
  }
};

export const setStorage = (key, value) => {
  const res = typeof value === "string" ? value : JSON.stringify(value);
  let obj = {
    data: res,
    time: Date.now(),
    storageTime: 30 * 24 * 60 * 60 * 1000,
  };
  window.localStorage.setItem(key, JSON.stringify(obj));
};

export const removeStorage = (key) => {
  window.localStorage.removeItem(key);
};
