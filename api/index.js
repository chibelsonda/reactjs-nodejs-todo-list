const express = require("express");
require("dotenv").config();
const graphql = require("express-graphql");
const schema = require("./src/schema");
const cors = require("cors");
const db = require("./src/schema/models");
const jwt = require("jsonwebtoken");

const main = async () => {
  const app = express();

  const verifyUser = async (req) => {
    try {
      const authorization = req.get("authorization");

      if (authorization) {
        const token = authorization.split(" ")[1];
        const { user } = await jwt.verify(token, process.env.SECRET);
        req.user = user;
      }
    } catch (err) {
      console.log(err);
    }
    req.next();
  };

  app.use(cors("*"));
  app.use(verifyUser);
  app.use(express.json());
  app.use(
    "/graphql",
    graphql.graphqlHTTP((req) => {
      return {
        schema,
        graphiql: process.env.NODE_ENV === "development",
        context: {
          user: req.user,
        },
      };
    })
  );

  db.sequelize
    .sync
    //   {alter:true, drop: false}
    ()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log(`Failed to sync db: ${err.message}`);
    });

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

main().catch((err) => {
  console.log(err);
});
