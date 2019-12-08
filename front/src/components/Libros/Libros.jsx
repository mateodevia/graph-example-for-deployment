import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getLibros = gql`
  {
    libros {
      nombre
      foto
      autor {
        nombre
      }
    }
  }
`;

function Libros(props) {
  return (
    <div>
      <h1>Libros</h1>
      <div className="row justify-content-center">
        {props.data.libros &&
          props.data.libros.map(libro => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img src={libro.foto} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{libro.nombre}</h5>
                <p>{libro.autor.nombre}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default graphql(getLibros)(Libros);
