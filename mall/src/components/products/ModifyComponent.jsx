import { useEffect, useRef, useState } from "react";
import { getOne } from "../../api/produtsAPI";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";

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
    const [fetching, setFetching] = useState(false);
    const uploadRef = useRef();

    useEffect(() => {
        setFetching(true);
        getOne(pno).then((data) => {
            setProduct(data);
            setFetching(false);
        });
    }, [pno]);

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;
        setProduct({ ...product });
    };

    const deleteOldImages = (imageNames) => {};

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {fetching ? <FetchingModal /> : <></>}
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
                                <button className="bg-blue-500 text-3xl text-white">
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
        </div>
    );
};

export default ModifyComponent;
