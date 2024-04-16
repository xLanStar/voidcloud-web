const { VITE_API_ENDPOINT, VITE_STORAGE_ENDPOINT } = import.meta.env;

export const BASE_URL = VITE_API_ENDPOINT;
export const STORAGE_URL = VITE_STORAGE_ENDPOINT;

/* 不指定網域(Release) */
/* 指定網域(Debug) */
export const API_URL = `${BASE_URL}/api`;

export const USER_API = `${API_URL}/user`;
export const USER_REGISTER_API = `${USER_API}/register`;
export const USER_LOGIN_API = `${USER_API}/login`;
export const USER_VALIDATE_API = `${USER_API}/validate`;

export const FILE_API = `${API_URL}/file`;
export const SHARE_FILE_API = `${FILE_API}/share`;

export const TORRENT_API = `${API_URL}/torrent`;
export const DOWNLOAD_TORRENT_API = `${TORRENT_API}/download`;

export const NotificationType = {
  Information: "Information",
  Success: "Success",
  Warning: "Warning",
  Error: "Error",
  Custom: "Custom",
};
export const NotificationTypeMap = [
  NotificationType.Information,
  NotificationType.Success,
  NotificationType.Warning,
  NotificationType.Error,
  NotificationType.Custom,
];

export const AccountValidator = /^\w*$/i;
export const EmailValidator =
  /^\w+((-\w+)|(\.\w+))*@\w+((\.|-)\w+)*\.[A-Za-z]+$/i;

export const SVG_ICON_COLOR_PRIMARY = "var(--primary-color-dark)";
export const SVG_ICON_COLOR_SECONDARY = "var(--secondary-color-dark)";

export const ViewType = {
  Image: 1,
  Video: 2,
  Text: 3,
  Other: -1,
  Invalid: 0,
};
