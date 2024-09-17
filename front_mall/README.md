# 라이브러리

1. css-in-js :
   npm install styled-components
   npm install @types/styled-components
2. React-Router : npm i react-router-dom

# 리액트 구현 설명

## React-Router

1. src 폴더 안에 router 폴더 생성
2. root.js 생성

```js
import { createBrowserRouter } from "react-router-dom";

const root = createBrowserRouter([]);
export default root;
```

root.js는 createBrowserRouter()를 통해서 어떤 경로(path)에는 어떤 컴포넌트를 보여줄 것인지 결정하는 역할을 한다. 경로 추가는 파라미터로 전달되는 배열의 내용물로 결정됩니다. 실행되는 리액트 애플리케이션을 root.js를 이용해서 경로에 맞는 컴포넌트를 보여주어야 합니다. 이를 위해서 App.jsx에 다음과 같이 수정

```jsx
import root from "./router/root";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={root} />
    </>
  );
}

export default App;
```

**root.js**

```jsx
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));
const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
]);

export default root;
```
