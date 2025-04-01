import { createSlice } from "@reduxjs/toolkit";

const initState = {
    email: "",
};

/*
    컴포넌트들은 액션(action)이라는 것을 이용해서 리듀서를 호출하는데
    리듀서에서는 액션의 페이로드(payload) 값을 처리해서 앞으로 보관해야 할 애플리케이션
    상태 데이터를 반환하게 됩니다. 예전에는 리듀서에서 액션과 리듀서를 별도로 작성했지만
    리덕스 툴킷에서는 슬라이스(slice)라는 이름으로 한 번에 작성 가능합니다.
*/
const loginSlice = createSlice({
    name: "LoginSlice",
    initialState: initState,
    reducers: {
        login: (state, action) => {
            console.log("login....");
        },
        logout: (state, action) => {
            console.log("logout....");
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
