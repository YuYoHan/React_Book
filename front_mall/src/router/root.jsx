import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
/*
     - 경로가 /이거나 없으면 MainPage를 보여줌
     - <Suspense>와 lazy()는 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 자연ㄹ딩 위해 사용
     - 컴포넌트 처리가 끝나지 않았으면 간단한 Loading...을 보여준다.
*/
// eslint-disable-next-line react-refresh/only-export-components
const Loading = <div>Loading...</div>;
// eslint-disable-next-line react-refresh/only-export-components
const Main = lazy(() => import("../pages/MainPage"));
// eslint-disable-next-line react-refresh/only-export-components
const About = lazy(() => import("../pages/AboutPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
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
]);

export default root;
