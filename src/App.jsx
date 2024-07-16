import { Helmet } from "react-helmet";
import Router from "src/Router/Router";
import GlobalStyle from "src/theme/GlobalStyles";

const App = () => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
