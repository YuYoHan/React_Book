import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import styled from "styled-components";

// 스타일 정의
const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem; /* m-2 */
  padding: 0.5rem; /* p-2 */
`;

const ListButton = styled.div`
  width: 5rem; /* w-20 */
  margin: 0.25rem; /* m-1 */
  padding: 0.5rem; /* p-2 */
  font-size: 1.25rem; /* text-xl */
  font-weight: 800; /* font-extrabold */
  text-align: center;
  text-decoration: underline;
`;

const AddButton = styled(ListButton)`
  /* AddButton inherits styles from ListButton */
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const IndexPage = () => {
  return (
    <BasicLayout>
      <Container>
        <ListButton>LIST</ListButton>
        <AddButton>ADD</AddButton>
        <Content>
          <Outlet />
        </Content>
      </Container>
    </BasicLayout>
  );
};

export default IndexPage;
