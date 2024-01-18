import { createClient } from "webdav";
import { STORAGE_URL } from "../reference";

const StorageHelper = {
  client: createClient(STORAGE_URL, {}),
  token: null,
};

export const connectStorage = (token) => {
  console.log("[雲端] 連線 Token:", token);
  StorageHelper.token = token;
  StorageHelper.client = createClient(STORAGE_URL, {
    headers: {
      Authorization: token,
    },
  });
};

export const disconnect = () => {
  console.log("[雲端] 關閉連線");
  StorageHelper.token = null;
  StorageHelper.client = createClient(STORAGE_URL, {});
};

export default StorageHelper;
