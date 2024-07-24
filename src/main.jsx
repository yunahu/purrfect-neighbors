import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App.jsx";
import antdTheme from "./theme/antdTheme.jsx";
import theme from "./theme/theme.jsx";

const client = new ApolloClient({
  uri: "http://localhost:3000",
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider theme={antdTheme}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>
);
