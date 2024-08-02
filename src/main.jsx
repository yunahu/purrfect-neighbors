import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import antdTheme from "./theme/antdTheme.jsx";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all"
  }
};

const link = createHttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
  credentials: "include"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  link
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>
  // </React.StrictMode>
);
