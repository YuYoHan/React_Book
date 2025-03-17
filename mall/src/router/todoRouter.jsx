import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading.....</div>;
const TodoList = lazy(() => import("../components/todo/ListPage"));
const TodoRead = lazy(() => import("../components/todo/ReadPage"));
const TodoAdd = lazy(() => import("../components/todo/AddPage"));
const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));

const todoRouter = () => {
    return [
        {
            path: "list",
            element: (
                <Suspense fallback={Loading}>
                    <TodoList />
                </Suspense>
            ),
        },
        {
            // /todo/ 이하의 경로가 지정되지 않았을 때 동작하는 빈 경로의 설정을 아래와 같이 추가
            path: "",
            element: <Navigate replace to="list" />,
        },
        {
            // 여기서 ':'이 부분은 경로의 일부를 변수로 사용하기 위한 설정으로
            // 브라우저에서 특정한 번호를 조회하는 용도로 사용한다.
            // 브라우저에서 /todo/read/33과 같은 경로로 호출하면 된다.
            path: "read/:tno",
            element: (
                <Suspense fallback={Loading}>
                    <TodoRead />
                </Suspense>
            ),
        },
        {
            path: "add",
            element: (
                <Suspense fallback={Loading}>
                    <TodoAdd />
                </Suspense>
            ),
        },
        {
            path: "modify/:tno",
            element: (
                <Suspense fallback={Loading}>
                    <TodoModify />
                </Suspense>
            ),
        },
    ];
};

export default todoRouter;
