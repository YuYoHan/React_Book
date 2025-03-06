import { useCallback } from "react";
import {
    createSearchParams,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";

const ReadPage = () => {
    // useParams()를 이용해서 지정된 변수를 추출할 수 있다.
    // 경로 자체 값을 사용
    const { tno } = useParams();
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const page = queryParams.get("page")
        ? parseInt(queryParams.get("page"))
        : 1;
    const size = queryParams.get("size")
        ? parseInt(queryParams.get("size"))
        : 10;

    const queryStr = createSearchParams({ page, size }).toString();

    const moveToModify = useCallback(
        (tno) => {
            navigate({ pathname: `/todo/modify/${tno}`, search: queryStr });
        },
        [tno, page, size]
    );

    const moveToList = useCallback(() => {
        navigate({ pathname: `/todo/list`, search: queryStr });
    }, [page, size]);

    return (
        <>
            <div className="text-3xl font-extrabold">
                Todo Read Page Component {tno}
            </div>
            <div>
                <button onClick={() => moveToModify(tno)}>Test Modify</button>
                <button onClick={() => moveToList()}>Test List</button>
            </div>
        </>
    );
};
export default ReadPage;
