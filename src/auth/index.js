import ApiHelper, { setAuthorization } from "../helper/APIHelpr";
import { connectStorage } from "../helper/StorageHelper";
import { USER_LOGIN_API, USER_REGISTER_API, USER_VALIDATE_API } from "../reference";
import { Notification, state } from "../store";

export const validate = async () => {
    const token = localStorage.getItem('token');
    console.log('[驗證]', "本機Token:", token);
    if (!token) return;

    await ApiHelper.post(USER_VALIDATE_API, null, { headers: { "Authorization": token } })
        .then(({ user }) => {
            state.user = user;
            setAuthorization(token);
            connectStorage(token);
            console.log('[驗證]', "驗證成功，使用者名稱:", user.name)
            Notification.info({ message: "驗證成功" });
        }).catch(err => {
            localStorage.removeItem("token");
            console.log('[驗證]', "驗證失敗，錯誤:", err)
            Notification.info({ message: "驗證失敗" });
        });
}

export const login = (account, password) => {
    return new Promise((resolve) => {
        ApiHelper.post(USER_LOGIN_API, {
            account,
            password,
        }).then(({ token, user }) => {
            state.user = user;
            setAuthorization(token);
            connectStorage(token)
            localStorage.setItem('token', token);
            console.log('[驗證]', "登入成功，使用者名稱:", user)
            Notification.info({ message: "登入成功" });
            resolve(true)
        }).catch(err => {
            console.log('[驗證]', "登入失敗，錯誤:", err)
            Notification.warning({ message: "登入失敗" });
            resolve(false)
        });
    })
}

export const logout = () => {
    if (!state.user) {
        console.log('[驗證]', "並未登入")
        return;
    }
    console.log('[驗證]', "登出")
    state.user = null;
    state.folder = [];
    localStorage.removeItem('token');
    setAuthorization(null);
    connectStorage()
}

export const register = async (name, account, email, password) => {
    return new Promise((resolve) => {
        ApiHelper.post(USER_REGISTER_API, {
            name,
            account,
            email,
            password,
        }).then(({ token, user }) => {
            resolve(true)
        }).catch(err => {
            console.log('[驗證]', "註冊失敗，錯誤:", err.name)
            Notification.warning({ message: "登入失敗" });
            resolve(false)
        });
    })
}