import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

/*
     라우팅 설정에 children 속성을 이용해서 중첩적인 라우팅 설정을 
     적용할 수 있지만 페이지가 많아지면 root.js 파일이 너무 복잡해지는 단점이 있다.
     그렇기 때문에 이럴 때는 별도의 함수에서 children 속성값에 해당하는 설정을 반환하는
     방식이 좀 더 알아보기 수월합니다.
*/
const Loading = <div>Loading....</div>;
const TodoList = lazy(() => import("../pages/todo/ListPage"));
const TodoRead = lazy(() => lazy(() => import("../pages/todo/ReadPage")));

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
    // 특정 경로로 진입 시에 자동으로 리다이렉션을 처리할 수 다.
    // 이 기능을 넣으면 Todo 메뉴를 선택하거나
    // '/todo/' 경로를 호출하는 경우 자동으로 '/todo/list' 로 이동
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      // :은 경로의 일부를 변수로 사용하기 위한 설정
      // 브라우저에서 특정한 번호를 조회하는 용도로 사용한다.
      // 브라우저에서 '/todo/read/33'과 같은 경로를 호출하면
      // ReadPage 컴포넌트가 실행됨
      path: "read/:tno",
      element: (
        <Suspense fallback={Loading}>
          <TodoRead />
        </Suspense>
      ),
    },
  ];
};

export default todoRouter;
