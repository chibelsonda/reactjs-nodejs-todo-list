"use strict";

const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;

const url = `${process.env.HOST}:${process.env.PORT || 3001}`;
const request = require("supertest")(url);
const jwt = require("jsonwebtoken");

const userId = 1;
const note = `Testting note ${Math.random().toString(36).substring(2, 7)}`;
const token = jwt.sign({ user: { id: userId } }, process.env.SECRET, {
  expiresIn: "1h",
});
const headers = {
  Authorization: `Bearer ${token}`,
};
var taskId;

describe("Task Integration", () => {
  it("Should resolve add task", (done) => {
    const query = `mutation { 
        createTask(user_id: "${userId}", note: "${note}") {
         id
         user_id 
         note 
       }
    }`;

    const expected = {
      user_id: userId.toString(),
      note,
    };

    request
      .post("/graphql")
      .set(headers)
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        taskId = res._body?.data?.createTask?.id;
        delete res._body?.data?.createTask?.id;
        expect(res._body.data.createTask).to.have.deep.equals(expected);
        done();
      });
  });

  it("Should resolve get user tasks", (done) => {
    const query = `query { tasks(user_id: "${userId}") { id user_id note } }`;

    request
      .post("/graphql")
      .set(headers)
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res._body.data.tasks[0]).to.have.all.keys(
          "id",
          "user_id",
          "note"
        );
        done();
      });
  });

  it("Should resolve delete task", (done) => {
    const query = `mutation {deleteTask(id: "${taskId}") {
            id
            user_id
            note
        }
    }`;

    const expected = {
      id: null,
      user_id: null,
      note: null,
    };

    request
      .post("/graphql")
      .set(headers)
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res._body.data.deleteTask).to.have.deep.equals(expected);
        done();
      });
  });
});
