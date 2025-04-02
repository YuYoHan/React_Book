import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days); // 보관기한
    return cookies.set(name, value, { expires: expires, path: "/" });
};

export const getCookie = (name) => {
    return cookies.get(name);
};

export const removeCookie = (name, path = "/") => {
    cookies.remove(name, { path: path });
};
