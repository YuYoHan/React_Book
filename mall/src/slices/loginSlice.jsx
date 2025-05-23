import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberAPI";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
    email: "",
};

const loadMemberCookie = () => {
    const memberInfo = getCookie("member");
    // 닉네임 처리
    if (memberInfo && memberInfo.nickName) {
        memberInfo.nickName = decodeURIComponent(memberInfo.nickName);
    }
    return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
    return loginPost(param);
});

/*
    컴포넌트들은 액션(action)이라는 것을 이용해서 리듀서를 호출하는데
    리듀서에서는 액션의 페이로드(payload) 값을 처리해서 앞으로 보관해야 할 애플리케이션
    상태 데이터를 반환하게 됩니다. 예전에는 리듀서에서 액션과 리듀서를 별도로 작성했지만
    리덕스 툴킷에서는 슬라이스(slice)라는 이름으로 한 번에 작성 가능합니다.
*/
const loginSlice = createSlice({
    name: "LoginSlice",
    initialState: loadMemberCookie() || initState, // 쿠키가 없다면 초깃값 사용
    reducers: {
        // state : 기존 데이터
        // action : 새로운 파라미터
        login: (state, action) => {
            console.log("login....");
            // {email, pw로 구성}
            // payload : 실제 값
            const payload = action.payload;
            setCookie("member", JSON.stringify(payload), 1);
            // 새로운 상태
            return payload;
        },
        logout: (state, action) => {
            console.log("logout....");
            // 로그아웃하면 쿠키 삭제
            removeCookie("member");
            return { ...initState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log("fulfilled");
                const payload = action.payload;

                if (!payload.error) {
                    setCookie("member", JSON.stringify(payload), 1);
                }
                return payload;
            })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected");
            });
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
