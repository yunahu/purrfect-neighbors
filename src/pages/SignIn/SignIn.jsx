import { Link } from "react-router-dom";
import logo from "src/assets/images/googleLogo.svg";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
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
  font-size: 20px;
  padding: 29px 0px;
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

const Logo = styled.img`
  position: absolute;
  left: 13px;
`;

const SignIn = () => {
  const signInWithGoogle = () => {
    window.open("http://localhost:3000/login/federated/google", "_self");
  };

  return (
    <Container>
      <Card>
        <StyledDiv>PurrFect Neighbors</StyledDiv>
        <GoogleButton onClick={signInWithGoogle}>
          <Logo src={logo} />
          Sign In With Google
        </GoogleButton>
      </Card>
    </Container>
  );
};

export default SignIn;
