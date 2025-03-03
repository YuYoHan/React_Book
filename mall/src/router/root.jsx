import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const TodoIndex = lazy(() => import("../pages/TodoIndexPage"));

// createBrowserRouter를 사용해 BrowserRouter를 생성

const root = createBrowserRouter([
  {
    // 경로가 / 혹은 아무것도 없을 떄 MainPage 컴포넌트를 보여준다.
    path: "",
    element: (
      // Suspense와 lazy는 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연로딩을 위해 사용한다.
      // 아직 컴포넌트 처리가 끝나지 않으면 로딩 메시지를 보여준다.
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "todo",
    element: (
      <Suspense fallback={Loading}>
        <TodoIndex />
      </Suspense>
    ),
  },
]);

export default root;
