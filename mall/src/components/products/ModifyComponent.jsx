import { useEffect, useRef, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/produtsAPI";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const initState = {
    pno: 0,
    pName: "",
    pDesc: "",
    price: 0,
    delFlag: false,
    uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ pno }) => {
    const [product, setProduct] = useState(initState);
    const uploadRef = useRef();
    const { moveToRead, moveToList } = useCustomMove();
    const delMutation = useMutation((pno) => deleteOne(pno));
    const queryClient = useQueryClient();
    const modMutation = useMutation((product) => putOne(pno, product));

    const query = useQuery(["products", pno], () => getOne(pno), {
        // 무한
        staleTime: Infinity,
    });

    useEffect(() => {
        // 절대 실행하면 안되는 무한 반복
        if (query.isSuccess) {
            setProduct(query.data);
        }
    }, [pno, query.data, query.isSuccess]);

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;
        setProduct({ ...product });
    };

    const deleteOldImages = (imageName) => {
        const resultFileNames = product.uploadFileNames.filter(
            (fileName) => fileName !== imageName
        );
        product.uploadFileNames = resultFileNames;
        setProduct({ ...product });
    };

    const handleClickModify = () => {
        const files = uploadRef.current.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        formData.append("pName", product.pName);
        formData.append("pDesc", product.pDesc);
        formData.append("price", product.price);
        formData.append("delFlag", product.delFlag);

        for (let i = 0; i < product.uploadFileNames.length; i++) {
            formData.append("uploadFileNames", product.uploadFileNames[i]);
        }
        modMutation.mutate(formData);
    };

    const handleClickDelete = () => {
        delMutation.mutate(pno);
    };

    const closeModal = () => {
        if (delMutation.isSuccess) {
            queryClient.invalidateQueries(["products", pno]);
            queryClient.invalidateQueries(["products/list"]);
            moveToList();
            return;
        }

        if (modMutation.isSuccess) {
            queryClient.invalidateQueries(["products", pno]);
            queryClient.invalidateQueries(["products/list"]);
            moveToRead();
        }
    };
    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {query.isFetching ||
            delMutation.isLoading ||
            modMutation.isLoading ? (
                <FetchingModal />
            ) : (
                <></>
            )}
            {delMutation.isSuccess || modMutation.isSuccess ? (
                <ResultModal
                    title={"처리결과"}
                    content={"정상적으로 처리되었습니다."}
                    callbackFn={closeModal}
                ></ResultModal>
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
                    <div className="w-1/5 p-6 text-right font-bold">
                        Product Price
                    </div>
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
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select
                        name="delFlag"
                        value={product.delFlag}
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    >
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
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
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                        Product Images
                    </div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                        {product.uploadFileNames.map((imgFile, i) => (
                            <div
                                className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                                key={i}
                            >
                                <button
                                    className="bg-blue-500 text-3xl text-white"
                                    onClick={() => deleteOldImages(imgFile)}
                                >
                                    DELETE
                                </button>
                                <img
                                    alt="img"
                                    src={`${host}/api/products/view/s_${imgFile}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button
                    type="button"
                    className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                    onClick={handleClickDelete}
                >
                    Delete
                </button>
                <button
                    type="button"
                    className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
                    onClick={handleClickModify}
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

export default ModifyComponent;
