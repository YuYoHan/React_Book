import styled from "styled-components";
import BasicMenu from "../components/menus/BasicMenu";

const Header = styled.header`
  background-color: #38b2ac; /* equivalent to bg-teal-400 */
  padding: 1.25rem; /* equivalent to p-5 */

  h1 {
    font-size: 1.5rem; /* equivalent to text-2xl */

    @media (min-width: 768px) {
      font-size: 2.25rem; /* equivalent to md:text-4xl */
    }
  }
`;

const LayoutContainer = styled.div`
  background-color: #ffffff; /* equivalent to bg-white */
  width: 100%; /* equivalent to w-full */
  display: flex;
  flex-direction: column;
  gap: 1rem; /* equivalent to space-y-4 */

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem; /* equivalent to md:space-x-4 and md:space-y-0 */
  }
`;

const Main = styled.main`
  background-color: #7dd3fc; /* equivalent to bg-sky-300 */
  padding: 2.5rem 1.25rem; /* equivalent to px-5 py-40 */

  @media (min-width: 768px) {
    width: 66.6667%; /* equivalent to md:w-2/3 */
  }

  @media (min-width: 1024px) {
    width: 75%; /* equivalent to lg:w-3/4 */
  }
`;

const Sidebar = styled.aside`
  background-color: #86efac; /* equivalent to bg-green-300 */
  padding: 2.5rem; /* equivalent to px-5 py-40 */

  @media (min-width: 768px) {
    width: 33.3333%; /* equivalent to md:w-1/3 */
  }

  @media (min-width: 1024px) {
    width: 25%; /* equivalent to lg:w-1/4 */
  }
`;

const SidebarTitle = styled.h1`
  font-size: 1.5rem; /* equivalent to text-2xl */

  @media (min-width: 768px) {
    font-size: 2.25rem; /* equivalent to md:text-4xl */
  }
`;

const BasicLayout = ({ children }) => {
  return (
    <>
      <BasicMenu />
      <LayoutContainer>
        <Main>{children}</Main>
        <Sidebar>
          <SidebarTitle>Sidebar</SidebarTitle>
        </Sidebar>
      </LayoutContainer>
    </>
  );
};

export default BasicLayout;
