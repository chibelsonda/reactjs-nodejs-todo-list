const { GraphQLID, GraphQLString, GraphQLObjectType } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    created_at: { type: GraphQLString },
    jwt_token: { type: GraphQLString },
  }),
});