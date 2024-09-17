import styled from "styled-components";
import BasicLayout from "../layouts/BasicLayout";

// Styled-component for the main page text
const MainText = styled.div`
  font-size: 1.875rem; /* equivalent to text-3xl */
`;

const MainPage = () => {
  return (
    <BasicLayout>
      <MainText>Main Page</MainText>
    </BasicLayout>
  );
};

export default MainPage;
