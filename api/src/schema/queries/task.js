const { GraphQLList, GraphQLID } = require("graphql");
const TaskType = require("../types/task");
const db = require("../models");

const Task = db.Task

const GET_TASKS = {
  type: new GraphQLList(TaskType),
  args: {
    user_id: { type: GraphQLID },
  },
  async resolve(parent, { user_id }, {user}) {
    if (user_id != user?.id) {
        throw new Error('Invalid access');
    }

    return await Task.findAll({
      where: {user_id}
    });
  }
}

module.exports = {
    GET_TASKS
};