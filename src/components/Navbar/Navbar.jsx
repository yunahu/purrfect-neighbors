import styled from "styled-components";

const Container = styled.div`
  height: 80px;
  border-bottom: 1px solid ${(props) => props.theme.grey};
`;

const Navbar = () => {
  return <Container>Navbar</Container>;
};

export default Navbar;
