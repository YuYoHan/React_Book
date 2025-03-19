import { useEffect, useState } from "react";
import { getOne } from "../../api/produtsAPI";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";

const initState = {
    pno: 0,
    pName: "",
    pDesc: "",
    price: 0,
    uploadFileNames: [],
};

const host = API_SERVER_HOST;
const ReadComponent = ({ pno }) => {
    const [product, setProduct] = useState(initState);
    // 화면 이동용 함수
    const { moveToList, moveToModify } = useCustomMove();
    // fetching
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        getOne(pno).then((data) => {
            setProduct(data);
            setFetching(false);
        });
    }, [pno]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {fetching ? <FetchingModal /> : <></>}
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.pno}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReadComponent;
