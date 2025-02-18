const { GraphQLID, GraphQLNonNull, GraphQLString } = require("graphql");
const TaskType = require("../types/task");
const db = require("../models");

const Task = db.Task;

const CREATE_TASK = {
  type: TaskType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLID) },
    note: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { user_id, note }, { user }) {
    if (user_id != user?.id) {
      throw new Error("Invalid access");
    }

    const task = await Task.findOne({ where: { user_id, note } });
    if (task) {
      throw new Error("Task is already exist.");
    }

    return await Task.create({ user_id, note });
  },
};

const DELETE_TASK = {
  type: TaskType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { id }, { user }) {
    return await Task.destroy({ where: { id, user_id: user?.id } })
      .then(function (rowDeleted) {
        if (rowDeleted === 1) {
          return true;
        }
      })
      .catch(function () {
        throw new Error("Server error, please try again.");
      });
  },
};

module.exports = {
  CREATE_TASK,
  DELETE_TASK,
};
