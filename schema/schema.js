const graphql = require("graphql");
var MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const LibroType = new GraphQLObjectType({
  name: "Libro",
  fields: () => ({
    _id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    foto: { type: GraphQLString },
    autor: {
      type: AutorType,
      resolve(parent, args) {
        return myMongoLib
          .getAutor(parent.autorId)
          .then(data => {
            return data;
          })
          .catch(err => {
            return err;
          });
      }
    }
  })
});

const AutorType = new GraphQLObjectType({
  name: "Autor",
  fields: () => ({
    _id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    foto: { type: GraphQLString },
    libros: {
      type: GraphQLList(LibroType),
      resolve(parent, args) {
        return myMongoLib
          .getLibrosOf(parent._id.toString())
          .then(data => {
            return data;
          })
          .catch(err => {
            return err;
          });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  // este no se encapsula en una funcion porque no importa el orden
  fields: {
    libro: {
      type: LibroType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return myMongoLib
          .getLibro(args.id)
          .then(data => {
            return data;
          })
          .catch(err => {
            return err;
          });
      }
    },
    autor: {
      type: AutorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return myMongoLib
          .getAutor(args.id)
          .then(data => {
            return data;
          })
          .catch(err => {
            return err;
          });
      }
    },
    libros: {
      type: new GraphQLList(LibroType),
      resolve(parent, args) {
        return myMongoLib
          .getLibros()
          .then(data => {
            return data;
          })
          .catch(err => {
            return err;
          });
      }
    },
    autores: {
      type: new GraphQLList(AutorType),
      resolve(parent, args) {
        return myMongoLib
          .getAutores()
          .then(data => {
            return data;
          })
          .catch(err => {
            return err;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
