import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const LogoutPage = lazy(() => import("../pages/member/LogoutPage"));
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));

const memberRouter = () => {
    return [
        {
            path: "login",
            element: (
                <Suspense fallback={Loading}>
                    <Login />
                </Suspense>
            ),
        },
        {
            path: "logout",
            element: (
                <Suspense fallback={Loading}>
                    <LogoutPage />
                </Suspense>
            ),
        },
        {
            path: "kakao",
            element: (
                <Suspense fallback={Loading}>
                    <KakaoRedirect />
                </Suspense>
            ),
        },
    ];
};

export default memberRouter;
