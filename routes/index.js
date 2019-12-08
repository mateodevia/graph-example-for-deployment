var express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("../schema/schema");
const cors = require("cors");
var router = express.Router();

router.use(cors());

router.use(
  "/graphql",
  graphqlHTTP({
    schema: schema
  })
);

module.exports = router;
