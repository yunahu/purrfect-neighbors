import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../context/useAuth";
import SearchBar from "../SearchBar";

const Container = styled.div`
  height: 80px;
  border-bottom: 1px solid var(--color-grey-100);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
`;

const UserLink = styled(Link)`
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
      <SearchBar />
      <User>
        <UserLink to={user ? "/profile" : "/signin"}>
          {username.toUpperCase()}
        </UserLink>
        {user ? (
          <SignInOutButton onClick={handleSignOut} $color="white">
            Sign Out
          </SignInOutButton>
        ) : (
          <Link to="/signin">
            <SignInOutButton $color="black">Sign In</SignInOutButton>
          </Link>
        )}
      </User>
    </Container>
  );
};

export default Navbar;
