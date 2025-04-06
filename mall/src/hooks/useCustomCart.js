import { useDispatch, useSelector } from "react-redux";
import { getCartItemAsync, postChangeCartAsync } from "../slices/cartSlice";

const useCustomCart = () => {
    const cartItems = useSelector((state) => state.cartSlice);
    const dispatch = useDispatch();

    const refreshCart = () => {
        dispatch(getCartItemAsync());
    };

    const changeCart = (param) => {
        dispatch(postChangeCartAsync(param));
    };

    return { cartItems, refreshCart, changeCart };
};

export default useCustomCart;
