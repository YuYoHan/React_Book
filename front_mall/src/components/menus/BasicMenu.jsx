import { Link } from "react-router-dom";
import styled from "styled-components";

// 스타일 정의
const Navbar = styled.nav`
  display: flex;
  background-color: #90cdf4; /* bg-blue-300 */
`;

const NavContainer = styled.div`
  flex: 4;
  background-color: #b987df; /* bg-gray-500 */
  flex: 4 1 0;
`;

const NavList = styled.ul`
  display: flex;
  padding: 1rem; /* p-4 */
  color: white;
  font-weight: 700; /* font-bold */
  margin: 0;
  list-style-type: none;
`;

const NavItem = styled.li`
  padding-right: 1.5rem; /* pr-6 */
  font-size: 1.5rem; /* text-2xl */
`;

const LoginSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  background-color: #f6ad55; /* bg-orange-300 */
  padding: 1rem; /* p-4 */
  font-weight: 500; /* font-medium */
`;

const LoginButton = styled.div`
  color: white;
  font-size: 0.875rem; /* text-sm */
  margin: 0.25rem; /* m-1 */
  border-radius: 0.25rem; /* rounded */
`;

const BasicMenu = () => {
  return (
    <Navbar id="navbar">
      <NavContainer>
        <NavList>
          <NavItem>
            <Link to="/">Main</Link>
          </NavItem>
          <NavItem>
            <Link to="/about">About</Link>
          </NavItem>
          <NavItem>
            <Link to={"/todo"}>Todo</Link>
          </NavItem>
        </NavList>
      </NavContainer>
      <LoginSection>
        <LoginButton>Login</LoginButton>
      </LoginSection>
    </Navbar>
  );
};

export default BasicMenu;
