/* eslint-disable react-hooks/rules-of-hooks */
// ListComponent는 useCustomMove()를 이용해서 현재 경로의 page와 size를 구성하고
// API서버를 호출합니다. 서버의 데이터는 dtoList라는 배열 데이터와 pageNumList라는
// 페이지 번호들이 존재하고, 이전(prev)/다음(next) 등의 추가적인 데이터가 있습니다.
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

    const { moveToLoginReturn } = useCustomLogin();

    /*
        invalidateQueries()를 이용하는 방식의 단점은 짧은 시간동안 동일한 페이지를
        클릭할 경우 매번 서버의 호출이 너무 많아지는게 단점이다.
        이런 상황을 피하려면 refresh 값과 staleTime을 같이 사용하면 일정 시간 동안은
        서버를 반복적으로 호출되는 문제를 피할 수 있습니다. 
        staleTime을 이용해서 약간의 시간 동안 반복적으로 서버를 호출하는 것을 막고
        refresh를 이용해서 동일한 페이지에 대한 쿼리 키 값을 변경하는 방식
    */
    const { isFetching, data, error, isError } = useQuery(
        ["products/list", { page, size, refresh }],
        () => getList({ page, size }),
        // staleTime 추가
        { staleTime: 1000 * 5 }
    );
    if (isError) {
        console.log(error);
        return moveToLoginReturn();
    }
    const serverData = data || initState;

    const queryClient = useQueryClient(); // 리액트 쿼리 초기화를 위한 현재 객체체
    const handleClickPage = (pageParam) => {
        if (pageParam.page === parseInt(page)) {
            queryClient.invalidateQueries("products/list");
        }
        moveToList(pageParam);
    };

    return (
        <>
            <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
                {isFetching ? <FetchingModal /> : <></>}
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
                    movePage={handleClickPage}
                ></PageComponent>
            </div>
        </>
    );
};

export default ListComponent;
