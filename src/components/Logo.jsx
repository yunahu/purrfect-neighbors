import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  font-family: "Pacifico", cursive;
  h1 {
    font-weight: normal;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <h1>PurrFect Neighbors</h1>
    </StyledLogo>
  );
}

export default Logo;
