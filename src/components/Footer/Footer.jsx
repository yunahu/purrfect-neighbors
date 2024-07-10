import styled from "styled-components";

const Container = styled.div`
  height: 101px;
  background-color: ${(props) => props.theme.lightGrey};
  color: ${(props) => props.theme.darkGrey};
`;

const Content = styled.div``;

const Footer = () => {
  return (
    <Container>
      <Content>
        <div>© 2024 Team Ushuaia. All rights reserved.</div>
      </Content>
    </Container>
  );
};

export default Footer;
