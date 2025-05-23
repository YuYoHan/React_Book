import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";

// Store 객체를 생성하기 위한 함수로 리덕스 툴킷의 configureStore()를 사용
export default configureStore({
    reducer: {
        loginSlice: loginSlice,
        cartSlice: cartSlice,
    },
});
