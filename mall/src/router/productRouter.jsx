import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const productRouter = () => {
    const Loading = <div>Loading....</div>;
    const ProductList = lazy(() => import("../pages/products/ListPage"));

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
    ];
};

export default productRouter;
