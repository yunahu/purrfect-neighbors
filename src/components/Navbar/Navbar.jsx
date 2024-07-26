import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../context/useAuth";

const Container = styled.div`
  height: 80px;
  border-bottom: 1px solid var(--color-grey-500);
  position: relative;
`;

const SignInOutButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: ${(props) =>
    props.$color === "black" ? "black" : "white"};
  border-radius: 20px;
  color: ${(props) =>
    props.$color === "black" ? "white" : "var(--color-grey-400)"};
  border: ${(props) =>
    props.$color === "black" ? "none" : `1px solid var(--color-grey-400)`};
  display: flex;
  align-items: center;
  position: absolute;
  right: 100px;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
`;

const UserLink = styled(Link)`
  position: absolute;
  top: 25px;
  right: 300px;
  text-decoration: underline;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const username = user ? user.name : "Guest";

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <Container>
      Navbar
      <UserLink to={user ? "/profile" : "/signin"}>
        {username.toUpperCase()}
      </UserLink>
      {!user && (
        <Link to="/signin">
          <SignInOutButton $color="black">Sign In</SignInOutButton>
        </Link>
      )}
      {user && (
        <SignInOutButton onClick={handleSignOut} $color="white">
          Sign Out
        </SignInOutButton>
      )}
    </Container>
  );
};

export default Navbar;
