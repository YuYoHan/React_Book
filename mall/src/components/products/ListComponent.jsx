// ListComponent는 useCustomMove()를 이용해서 현재 경로의 page와 size를 구성하고
// API서버를 호출합니다. 서버의 데이터는 dtoList라는 배열 데이터와 pageNumList라는
// 페이지 번호들이 존재하고, 이전(prev)/다음(next) 등의 추가적인 데이터가 있습니다.
import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";

const host = API_SERVER_HOST;

const initState = {
    dtoList: [],
    pageNumeList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    tototalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const ListComponent = () => {
    const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

    const [serverData, setServerData] = useState(initState);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getList({ page, size }).then((data) => {
            console.log(data);
            setServerData(data);
            setFetching(false);
        });
        // refresh는 동일한 페이지 번호를 클릭했을 때 true/false를 통해
        // 다시 호출시켜줍니다.
    }, [page, size, refresh]);

    return (
        <>
            <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
                {fetching ? <FetchingModal /> : <></>}
                <div className="flex flex-wrap mx-auto p-6">
                    {serverData.dtoList.map((product) => (
                        <div
                            key={product.pno}
                            className="w-1/2 p-1 rounded shadow-md border-2"
                            onClick={() => moveToRead(product.pno)}
                        >
                            <div className="flex flex-col h-full">
                                <div className="font-extrabold text-2xl p-2 w-full">
                                    {product.pno}
                                </div>
                                <div className="text-1xl m-1 p-2 w-full flex flex-col">
                                    <div className="w-full overflow-hidden">
                                        <img
                                            alt="product"
                                            className="m-auto rounded-md w-60"
                                            src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                                        />
                                    </div>
                                    <div className="bottom-0 font-extrabold bg-white">
                                        <div className="text-center p-1">
                                            이름 : {product.pName}
                                        </div>
                                        <div className="text-center p-1">
                                            가격 : {product.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <PageComponent
                    serverData={serverData}
                    movePage={moveToList}
                ></PageComponent>
            </div>
        </>
    );
};

export default ListComponent;
