import styled from "styled-components";
import logo from "src/assets/images/googleLogo.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.darkGrey};
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
`;

const Logo = styled.img`
  position: absolute;
  left: 13px;
`;

const SignIn = () => {
  return (
    <Container>
      <Card>
        <StyledDiv>PurrFect Neighbors</StyledDiv>
        <Link to="/">
          <GoogleButton>
            <Logo src={logo} />
            Sign In With Google
          </GoogleButton>
        </Link>
      </Card>
    </Container>
  );
};

export default SignIn;
