import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 이거를 항상 작성하면 귀찮으니 여기에다 따로 빼놓는다.
    const loginState = useSelector((state) => state.loginState);
    // 로그인 여부
    const isLogin = loginState.email ? true : false;

    // 로그인 함수
    const doLogin = async (loginParam) => {
        const action = dispatch(loginPostAsync(loginParam));
        return action.payload;
    };

    // 로그아웃 함수
    const doLogout = () => {
        dispatch(logout());
    };

    // 페이지 이동
    const moveToPath = (path) => {
        navigate({ pathname: path }, { replace: true });
    };

    // 로그인 페이지 이동
    const moveToLogin = () => {
        navigate({ pathname: "/member/login" }, { replace: true });
    };

    // 로그인 페이지로 이동 컴포넌트
    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login" />;
    };

    return {
        loginState,
        isLogin,
        doLogin,
        doLogout,
        moveToPath,
        moveToLogin,
        moveToLoginReturn,
    };
};

export default useCustomLogin;
