import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
    email: "",
    nickName: "",
    social: false,
    accessToken: "",
    refreshToken: "",
};

const loadMemberCookie = () => {
    const memberInfo = getCookie("member");

    // 닉네임 처리
    if (memberInfo && memberInfo.nickName) {
        memberInfo.nickName = decodeURIComponent(memberInfo.nickName);
    }

    return memberInfo;
};

const signinState = atom({
    key: "signinState",
    default: loadMemberCookie() || initState,
});

export default signinState;
