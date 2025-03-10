import { useParams } from "react-router-dom";
import ReadComponent from "./ReadComponent";

const ReadPage = () => {
    // useParams()를 이용해서 지정된 변수를 추출할 수 있다.
    // 경로 자체 값을 사용
    const { tno } = useParams();

    return (
        <>
            <div className="text-3xl font-extrabold">
                Todo Read Page Component {tno}
            </div>
            <div>
                <ReadComponent tno={tno}></ReadComponent>
            </div>
        </>
    );
};
export default ReadPage;
