import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAutores = gql`
  {
    autores {
      nombre
      foto
      libros {
        nombre
      }
    }
  }
`;

function Autores(props) {
  return (
    <div>
      <h1>Autores</h1>
      <div className="row justify-content-center">
        {props.data.autores &&
          props.data.autores.map(autor => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img src={autor.foto} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{autor.nombre}</h5>
                <h6>Libros:</h6>
                {autor.libros.map(libro => (
                  <p>{libro.nombre}</p>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default graphql(getAutores)(Autores);
