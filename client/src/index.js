import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Css/reg.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink ,
  gql,
} from "@apollo/client";
import { GET_LABS } from "./query/query";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include", // set credentials option to include
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
