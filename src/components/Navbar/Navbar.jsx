import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
  height: 80px;
  border-bottom: 1px solid ${(props) => props.theme.grey};
  position: relative;
`;

const SignInOutButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: ${(props) =>
    props.$color === "black" ? "black" : "white"};
  border-radius: 20px;
  color: ${(props) =>
    props.$color === "black" ? "white" : props.theme.darkGrey};
  border: ${(props) =>
    props.$color === "black" ? "none" : `1px solid ${props.theme.darkGrey}`};
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      const response = await fetch("http://localhost:3000/user", {
        credentials: "include",
      });
      if (response.status === 200) {
        const resp = await response.json();
        setUser(resp);
      }
    };

    run();
  }, []);

  const logout = async () => {
    const response = await fetch("http://localhost:3000/logout", {
      credentials: "include",
    });
    setUser(null);
  };

  const getFirstName = (fullname) =>
    fullname.substring(0, user.name.indexOf(" "));

  return (
    <Container>
      Navbar
      <UserLink to={user ? "/userProfile" : "/guest"}>
        {user ? getFirstName(user.name) : "Guest"}
      </UserLink>
      {!user && (
        <Link to="/signin">
          <SignInOutButton $color="black">Sign In</SignInOutButton>
        </Link>
      )}
      {user && (
        <SignInOutButton onClick={logout} $color="white">
          Sign Out
        </SignInOutButton>
      )}
    </Container>
  );
};

export default Navbar;
