import { useDispatch, useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect } from "react";
import { getCartItemAsync } from "../../slices/cartSlice";

const CartComponent = () => {
    const { isLogin, loginState } = useCustomLogin();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartSlice);

    useEffect(() => {
        if (isLogin) {
            dispatch(getCartItemAsync());
        }
    }, [isLogin]);

    return (
        <div className="w-full">
            {isLogin ? (
                <>
                    <div className="flwx">
                        <div className="m-2 font-extrabold">
                            {loginState.nickName}'s Cart\
                        </div>
                        <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-2">
                            {cartItems.length}
                        </div>
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default CartComponent;
