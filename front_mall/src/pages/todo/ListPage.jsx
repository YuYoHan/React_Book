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
  return (
    <Container>
      <Title>Todo List Page Component</Title>
    </Container>
  );
};

export default ListPage;
