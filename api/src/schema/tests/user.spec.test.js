'use strict';

const { GraphQLID, GraphQLString } = require('graphql');
const chai = require('chai');

const UserType = require('../types/user');

const expect = chai.expect;

describe('User Specs', () => {
  it('Should have an id field of type ID', () => {
    expect(UserType.getFields()).to.have.property('id');
    expect(UserType.getFields().id.type).to.deep.equals(GraphQLID);
  });

  it('Should have a name field of type String', () => {
    expect(UserType.getFields()).to.have.property('name');
    expect(UserType.getFields().name.type).to.deep.equals(GraphQLString);
  });

  it('Should have an email field of type String', () => {
    expect(UserType.getFields()).to.have.property('email');
    expect(UserType.getFields().email.type).to.deep.equals(GraphQLString);
  });

  it('Should have a password field of type String', () => {
    expect(UserType.getFields()).to.have.property('password');
    expect(UserType.getFields().password.type).to.deep.equals(GraphQLString);
  });

  it('Should have a created_at field of type String', () => {
    expect(UserType.getFields()).to.have.property('created_at');
    expect(UserType.getFields().created_at.type).to.deep.equals(GraphQLString);
  });
});
