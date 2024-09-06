import styled from "styled-components";

// Tailwind CSS 스타일을 `styled-components`로 변환
const StyledHeading = styled.h1`
    font-weight: bold; /* font-bold */
    text-decoration: underline; /* underline */
`;

function App() {
    return (
        <>
            <StyledHeading>Hello</StyledHeading>
        </>
    );
}

export default App;
