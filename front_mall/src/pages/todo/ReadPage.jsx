import {
  useParams,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { useCallback } from "react";

// Styled-component for the page text
const PageText = styled.div`
  font-size: 1.875rem; /* equivalent to text-3xl */
  font-weight: 800; /* equivalent to font-extrabold */
`;

const ReadPage = () => {
  const { tno } = useParams();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  const queryStr = createSearchParams({ page, size }).toString;
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
    <PageText>
      Todo Read Page Component {tno}
      <div>
        <button onClick={() => moveToModify(tno)}>Test Modify</button>
        <button onClick={() => moveToList()}>Test List</button>
      </div>
    </PageText>
  );
};

export default ReadPage;
