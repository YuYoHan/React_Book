import styled from "styled-components";

// Styled-component for the page text
const PageText = styled.div`
  font-size: 1.875rem; /* equivalent to text-3xl */
  font-weight: 800; /* equivalent to font-extrabold */
`;

const ModifyPage = ({ tno }) => {
  return <PageText>Todo Modify Page</PageText>;
};

export default ModifyPage;
