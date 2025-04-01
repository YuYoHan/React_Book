import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const LogoutPage = lazy(() => import("../pages/member/LogoutPage"));

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
    ];
};

export default memberRouter;
