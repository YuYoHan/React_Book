// PageComponent는 ListComponent가 받아오는 서버의 데이터와 useCustomMove()에서 만들어진
// moveToList()를 movePage 속성으로 전달받도록 구성하고 이를 활용합니다.
const PageComponent = ({ serverData, movePage }) => {
    return (
        <>
            <div className="m-6 flex justify-center">
                {serverData.prev ? (
                    <div
                        className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                        onClick={() => movePage({ page: serverData.prevPage })}
                    >
                        Prev{" "}
                    </div>
                ) : (
                    <></>
                )}

                {/* 여기서 map에서 => {}를 안하는 이유는
                    {}를 하면 return을 해줘야하기 때문이다. */}
                {serverData.pageNumList.map((pageNum) => (
                    <div
                        key={pageNum}
                        className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${
                            serverData.current === pageNum
                                ? "bg-gray-500"
                                : "bg-blue-400"
                        }`}
                        onClick={() => movePage({ page: pageNum })}
                    >
                        {pageNum}
                    </div>
                ))}
                {serverData.next ? (
                    <div
                        className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                        onClick={() => movePage({ page: serverData.nextPage })}
                    >
                        Next
                    </div>
                ) : (
                    <> </>
                )}
            </div>
        </>
    );
};
export default PageComponent;
