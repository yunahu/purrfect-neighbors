import { Link } from "react-router-dom";
import googlelogo from "src/assets/images/googleLogo.svg";
import styled from "styled-components";

import Logo from "../../components/Logo";

const Container = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 30px;
  border: 1px solid var(--color-grey-400);
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDiv = styled.div`
  padding: 3rem 0 1rem;
`;

const GoogleButton = styled.button`
  width: 320px;
  height: 48px;
  background-color: black;
  border-radius: 30px;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
`;

const GLogo = styled.img`
  position: absolute;
  left: 13px;
`;

const SignIn = () => {
  const signInWithGoogle = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/login/federated/google`, "_self");
  };

  return (
    <Container>
      <Card>
        <StyledDiv>
          <Logo />
        </StyledDiv>
        <GoogleButton onClick={signInWithGoogle}>
          <GLogo src={googlelogo} />
          Sign In With Google
        </GoogleButton>
      </Card>
    </Container>
  );
};

export default SignIn;
