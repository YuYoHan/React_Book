import useCustomLogin from "../../hooks/useCustomLogin";

const CartComponent = () => {
    const { isLogin, loginState } = useCustomLogin();
    return (
        <div className="w-full">
            {isLogin ? <div>{loginState.nickName}'s Cart</div> : <div></div>}
        </div>
    );
};

export default CartComponent;
