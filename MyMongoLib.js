const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const MyMongoLib = function() {
  const exports = this || {};
  // Connection URL
  let url = "mongodb://mateo:m12345@ds253428.mlab.com:53428/gql-web";
  const client = new MongoClient(url, { useUnifiedTopology: true });
  let conn = MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  // Database Name
  const dbName = "gql-web";

  exports.getAutor = autorId =>
    new Promise((resolve, reject) => {
      conn.then(client => {
        console.log("Connected correctly to db");
        const db = client.db(dbName);
        const testCol = db.collection("autores");
        let o_id = new ObjectID(autorId);
        return testCol
          .findOne({ _id: o_id })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    });

  exports.getAutores = () =>
    new Promise((resolve, reject) => {
      conn.then(client => {
        console.log("Connected correctly to db");
        const db = client.db(dbName);
        const testCol = db.collection("autores");
        return testCol
          .find({})
          .toArray()
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    });

  exports.getLibro = libroId =>
    new Promise((resolve, reject) => {
      conn.then(client => {
        console.log("Connected correctly to db");
        const db = client.db(dbName);
        const testCol = db.collection("libros");
        let o_id = new ObjectID(libroId);
        return testCol
          .findOne({ _id: o_id })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    });

  exports.getLibros = () =>
    new Promise((resolve, reject) => {
      conn.then(client => {
        console.log("Connected correctly to db");
        const db = client.db(dbName);
        const testCol = db.collection("libros");
        return testCol
          .find({})
          .toArray()
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    });

  exports.getLibrosOf = autorId =>
    new Promise((resolve, reject) => {
      conn.then(client => {
        console.log("Connected correctly to db");
        const db = client.db(dbName);
        const testCol = db.collection("libros");
        return testCol
          .find({ autorId: autorId })
          .toArray()
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    });

  return exports;
};

module.exports = MyMongoLib;
