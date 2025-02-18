const graphql = require("graphql");
const userQuery = require("./queries/user");
const userMutation = require("./mutations/user");
const taskMutation = require("./mutations/task");

const taskQuery = require("./queries/task");

const RootQuery = new graphql.GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: userQuery.GET_ALL_USERS,
    tasks: taskQuery.GET_TASKS
  },
});

const Mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    signupUser: userMutation.SIGNUP_USER,
    loginUser: userMutation.LOGIN_USER,

    createTask: taskMutation.CREATE_TASK,
    deleteTask: taskMutation.DELETE_TASK
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});



