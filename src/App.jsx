import { Helmet } from "react-helmet";
import Router from "src/Router/Router";
import GlobalStyle from "src/theme/GlobalStyles";

import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <Router />
    </AuthProvider>
  );
};

export default App;
