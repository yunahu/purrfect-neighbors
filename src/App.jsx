import styled, { createGlobalStyle } from "styled-components";
import Navbar from "src/components/Navbar/Navbar";
import Router from "src/Router/Router";
import Footer from "src/components/Footer/Footer";

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	body {
		margin: 0px;
	}	
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex-grow: 1;
`;

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <Navbar />
      <Content>
        <Router />
      </Content>
      <Footer />
    </Container>
  );
};

export default App;
