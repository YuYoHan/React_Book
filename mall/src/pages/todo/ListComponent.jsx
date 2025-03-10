// ListComponent는 useCustomMove()를 이용해서 현재 경로의 page와 size를 구성하고
// API서버를 호출합니다. 서버의 데이터는 dtoList라는 배열 데이터와 pageNumList라는
// 페이지 번호들이 존재하고, 이전(prev)/다음(next) 등의 추가적인 데이터가 있습니다.
import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../components/common/PageComponent";

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
    const { page, size, moveToList } = useCustomMove();

    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList({ page, size }).then((data) => {
            console.log(data);
            setServerData(data);
        });
    }, [page, size]);

    return (
        <>
            <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
                <div className="flex flex-wrap mx-auto justify-center p-6">
                    {serverData.dtoList.map((todo) => (
                        <div
                            key={todo.tno}
                            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
                        >
                            <div className="flex">
                                <div className="font-extrabold text-2xl p-2 w-1/12">
                                    {todo.tno}
                                </div>
                                <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                                    {todo.title}
                                </div>
                                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                                    {todo.dueDate}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 페이징 처리(번호호) */}
                <PageComponent
                    serverData={serverData}
                    movePage={moveToList}
                ></PageComponent>
            </div>
        </>
    );
};

export default ListComponent;
