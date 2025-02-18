"use strict";

const { GraphQLID, GraphQLString } = require("graphql");
const chai = require("chai");

const TaskType = require("../types/task");

const expect = chai.expect;

describe("Task Specs", () => {
  it("Should have an id field of type ID", () => {
    expect(TaskType.getFields()).to.have.property("id");
    expect(TaskType.getFields().id.type).to.deep.equals(GraphQLID);
  });

  it("Should have a user_id field of type ID", () => {
    expect(TaskType.getFields()).to.have.property("user_id");
    expect(TaskType.getFields().user_id.type).to.deep.equals(GraphQLID);
  });

  it("Should have a note field of type String", () => {
    expect(TaskType.getFields()).to.have.property("note");
    expect(TaskType.getFields().note.type).to.deep.equals(GraphQLString);
  });

  it("Should have a created_at field of type ID", () => {
    expect(TaskType.getFields()).to.have.property("created_at");
    expect(TaskType.getFields().created_at.type).to.deep.equals(GraphQLString);
  });
});
