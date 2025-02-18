"use strict";

const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;

const url = `${process.env.HOST}:${process.env.PORT || 3001}`;
const request = require("supertest")(url);

const randStr = Math.random().toString(36).substring(2, 7);
const name = `${randStr} ${randStr}`;
const email = `${randStr}@test.com`;
const password = "pass123";

describe("User Integration", () => {
  it("Should resolve get signup user", (done) => {
    const query = `mutation {
      signupUser(name: "${name}", email: "${email}", password: "${password}") {
         name
         email
        }
      }`;

    const expected = {
      name,
      email,
    };

    request
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res._body.data.signupUser).to.have.deep.equals(expected);
        done();
      });
  });

  it("Should resolve get login user", (done) => {
    const query = `mutation {
      loginUser(email: "${email}", password: "${password}") {
         name
         email
        }
      }`;

    const expected = {
      name,
      email,
    };

    request
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res._body.data.loginUser).to.have.deep.equals(expected);
        done();
      });
  });
});
