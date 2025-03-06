import { useSearchParams } from "react-router-dom";

const ListPage = () => {
    // ? 이후에 나오는 쿼리스트링은 useSearchParams()을 사용할수 있습니다.
    // /todo/list?page=3&size=20 이런식으로 날라오는게 쿼리스트링
    const [queryParams] = useSearchParams();
    // 쿼리스트링이 있는 경우에는 해당 값을 이용하고 그렇지 않다면 1, 10과 같은 값을 사용
    const page = queryParams.get("page")
        ? parseInt(queryParams.get("page"))
        : 1;
    const size = queryParams.get("size")
        ? parseInt(queryParams.get("size"))
        : 10;

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Todo List Page Component {page} --- {size}
            </div>
        </div>
    );
};
export default ListPage;
