import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Libros from "./components/Libros/Libros";
import Autores from "./components/Autores/Autores";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Libros />
        <Autores />
      </div>
    </ApolloProvider>
  );
}

export default App;
