import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create();
const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST;
    const header = { headers: { Authorization: `Bearer ${accessToken}` } };
    const res = await axios.get(
        `${host}/api/member/refresh?refreshToken=${refreshToken}`,
        header
    );
    return res.data;
};

const beforeReq = (config) => {
    // 쿠키에서 유저 정보를 가져옴
    // 즉, 로그인 중이여야한다.
    const memberInfo = getCookie("member");
    // 쿠키에 유저 정보가 없으면 에러 발생
    if (!memberInfo) {
        console.log("Member Not Found");
        return Promise.reject({
            response: {
                data: {
                    error: "REQUIRE_LOGIN",
                },
            },
        });
    }
    const { accessToken } = memberInfo;
    // Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
};

// fail request
const requestFail = (err) => {
    return Promise.reject(err);
};

// before return response
const beforeRes = async (res) => {
    const data = res.data;

    if (data && data.error === "ERROR_ACCESS_TOKEN") {
        const memberCookieValue = getCookie("member");

        const result = await refreshJWT(
            memberCookieValue.accessToken,
            memberCookieValue.refreshToken
        );
        console.log("refreshJWT Result", result);
        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        setCookie("member", JSON.stringify(memberCookieValue), 1);

        const originalRequest = res.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return await axios(originalRequest);
    }
    return res;
};

// fail response
const responseFail = (err) => {
    return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
