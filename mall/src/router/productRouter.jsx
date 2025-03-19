import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const productRouter = () => {
    const Loading = <div>Loading....</div>;
    const ProductList = lazy(() => import("../pages/products/ListPage"));
    const ProductAdd = lazy(() => import("../pages/products/AddPage"));
    const ProductRead = lazy(() => import("../pages/products/ReadPage"));

    return [
        {
            path: "list",
            element: (
                <Suspense fallback={Loading}>
                    <ProductList />
                </Suspense>
            ),
        },
        {
            path: "",
            element: <Navigate replace to="/products/list" />,
        },
        {
            path: "add",
            element: (
                <Suspense fallback={Loading}>
                    <ProductAdd />
                </Suspense>
            ),
        },
        {
            path: "read/:pno",
            element: (
                <Suspense fallback={Loading}>
                    <ProductRead />
                </Suspense>
            ),
        },
    ];
};

export default productRouter;
