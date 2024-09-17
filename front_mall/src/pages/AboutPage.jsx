import styled from "styled-components";
import BasicLayout from "../layouts/BasicLayout";

// Styled-component for the About page text
const AboutText = styled.div`
  font-size: 1.25rem; /* equivalent to text-xl */
`;

const AboutPage = () => {
  return (
    <BasicLayout>
      <AboutText>About Page</AboutText>
    </BasicLayout>
  );
};

export default AboutPage;
