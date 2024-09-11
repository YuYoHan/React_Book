import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  background-color: white;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const ListPage = () => {
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  return (
    <Container>
      <Title>
        Todo List Page Component {page} -- {size}
      </Title>
    </Container>
  );
};

export default ListPage;
