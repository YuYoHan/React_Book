import { useRef, useState } from "react";
import { postAdd } from "../../api/todoApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const initState = {
    pName: "",
    pDesc: "",
    price: 0,
    files: [],
};

const AddComponent = () => {
    const [product, setProduct] = useState({ ...initState });
    const uploadRef = useRef();
    const { moveToList } = useCustomMove(); // 이동을 위한 함수수

    // 입력값 처리
    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;
        setProduct({ ...product });
    };

    // 리액트 쿼리
    // SQL로 따지면 insert, delete, update같이 사용
    const addMutation = useMutation((product) => postAdd(product));

    const handleClickAdd = (e) => {
        const files = uploadRef.current.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        formData.append("pName", product.pName);
        formData.append("pDesc", product.pDesc);
        formData.append("price", product.price);
        console.log(formData);

        addMutation.mutate(formData);
    };

    const queryClient = useQueryClient();

    const closeModal = () => {
        queryClient.invalidateQueries("products/list");
        moveToList({ page: 1 });
    };

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {addMutation.isLoading ? <FetchingModal /> : <></>}
            {addMutation.isSuccess ? (
                <ResultModal
                    title={"Add Result"}
                    content={`Add Success ${addMutation.data.result}`}
                    callbackFn={closeModal}
                />
            ) : (
                <></>
            )}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                        Product Name
                    </div>
                    <input
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="pName"
                        type={"text"}
                        value={product.pName}
                        onChange={handleChangeProduct}
                    ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="pDesc"
                        rows="4"
                        onChange={handleChangeProduct}
                        value={product.pDesc}
                    >
                        {product.pDesc}
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="price"
                        type={"number"}
                        value={product.price}
                        onChange={handleChangeProduct}
                    ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input
                        ref={uploadRef}
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        type={"file"}
                        multiple={true}
                    ></input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <button
                        type="button"
                        className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                        onClick={handleClickAdd}
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AddComponent;
