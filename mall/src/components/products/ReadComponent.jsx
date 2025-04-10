import { getOne } from "../../api/produtsAPI";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery } from "@tanstack/react-query";

const initState = {
    pno: 0,
    pName: "",
    pDesc: "",
    price: 0,
    uploadFileNames: [],
};

const host = API_SERVER_HOST;
const ReadComponent = ({ pno }) => {
    // 화면 이동용 함수
    const { moveToList, moveToModify } = useCustomMove();
    // 장바구니 기능
    const { changeCart, cartItems } = useCustomCart();
    // 로그인 정보
    const { loginState } = useCustomLogin();

    // useQuery()는 특정 데이터를 조회하고 통신상태나 결과 혹은 에러 데이터 등을
    // 한번에 처리할 수 있게 도와준다.
    // useQuery()의 파라미터는 크게 쿼리 키(key), 쿼리 함수, 옵션으로 구분된다.
    // 이 중에서 쿼리 키는 리액트 쿼리에서 식별자처럼 사용된다.
    // isFetching은 서버와 비동기 통신 중인지를 확인할 때 사용
    // data는 서버에서 처리된 결과 데이터를 의미한다.
    const { isFetching, data } = useQuery(
        ["products", pno],
        () => getOne(pno),
        {
            staleTime: 1000 * 10,
            retry: 1,
        }
    );

    const handleClickAddCart = () => {
        let qty = 1;
        const addedItem = cartItems.filter(
            (item) => item.pno === parseInt(pno)
        )[0];

        if (addedItem) {
            if (
                window.confirm("이미 추가된 상품입니다. 추가하시겠습니까? ") ===
                false
            ) {
                return;
            }
            qty = addedItem.qty + 1;
        }
        changeCart({ email: loginState.email, pno: pno, qty: qty });
    };

    const product = data || initState;

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {/* isFetching은 서버와 비동기 통신 중인지를 확인할 때 사용 */}
            {isFetching ? <FetchingModal /> : <></>}
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.pno}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
                    <div className="w-4/6 p-6 rounded-r border border-solid shadow-md">
                        {product.pName}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
                    <div className="w-4/6 p-6 rounded-r border border-solid shadow-md">
                        {product.price}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
                    <div className="w-4/6 p-6 rounded-r border border-solid shadow-md">
                        {product.pDesc}
                    </div>
                </div>
            </div>
            <div className="w-full justify-center flex flex-col m-auto items-center">
                {product.uploadFileNames.map((imagFile, i) => (
                    <img
                        alt="product"
                        key={i}
                        className="p-4 w-1/2"
                        src={`${host}/api/products/view/${imagFile}`}
                    />
                ))}
            </div>
            <div className="flex justify-end p-4">
                <button
                    type="button"
                    className="inline-block rounded p-4 text-xl w-32 text-white bg-green-500"
                    onClick={handleClickAddCart}
                >
                    Add Cart
                </button>
                <button
                    type="button"
                    className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                    onClick={() => moveToModify(pno)}
                >
                    Modify
                </button>
                <button
                    type="button"
                    className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={moveToList}
                >
                    List
                </button>
            </div>
        </div>
    );
};
export default ReadComponent;
