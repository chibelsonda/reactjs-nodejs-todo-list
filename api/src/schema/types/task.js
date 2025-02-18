const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLInt } = require("graphql");

module.exports = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLID},
    note: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
});