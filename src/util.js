import { ViewType } from "./reference";

export const uuid = () => {
  let d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const GeneralViewTypeMap = {
  image: ViewType.Image,
  video: ViewType.Video,
  text: ViewType.Text,
};

export const getViewType = (file) => {
  if (!file || file.type !== "file") return ViewType.Invalid;
  const m = file.mime.split("/");

  // specific extension

  // general type
  return GeneralViewTypeMap[m[0]] ?? ViewType.Other;
};

const decoder = new TextDecoder("UTF-8");

const toString = (bytes) => {
  const array = new Uint8Array(bytes);
  return decoder.decode(array);
};
