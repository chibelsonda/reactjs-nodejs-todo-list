const graphql = require("graphql");
const UserType = require("../types/user");
const db = require("../models");

const User = db.User

const GET_ALL_USERS = {
  type: new graphql.GraphQLList(UserType),
  async resolve() {
    return await User.findAll();
  },
}

module.exports = {
  GET_ALL_USERS
};