const { GraphQLID, GraphQLString } = require("graphql");
const UserType = require("../types/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.User;

const SIGNUP_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { name, email, password } = args;

    const u = await User.findOne({ where: { email } });
    if (u) {
      throw new Error("Email is already exist.");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({ name, email, password: hashPassword });
    const token = jwt.sign(
      {
        user: { id: user.id, email: user.email },
      },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.jwt_token = token;

    return user;
  },
};

const LOGIN_USER = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { email, password } = args;

    const user = await User.findOne({ where: { email: email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        user: { id: user.id, email: user.email },
      },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.jwt_token = token;
    return user;
  },
};

module.exports = {
  SIGNUP_USER,
  LOGIN_USER,
};
