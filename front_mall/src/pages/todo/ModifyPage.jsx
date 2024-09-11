import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled-component for the page text
const PageText = styled.div`
  font-size: 1.875rem; /* equivalent to text-3xl */
  font-weight: 800; /* equivalent to font-extrabold */
`;

const ModifyPage = ({ tno }) => {
  const navigate = useNavigate();
  const moveToRead = () => {
    navigate({ pathname: `/todo/read/${tno}` });
  };
  const moveToList = () => {
    navigate({ pathname: `/todo/list` });
  };

  return <PageText>Todo Modify Page</PageText>;
};

export default ModifyPage;
