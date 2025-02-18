import { gql } from "@apollo/client";

const SIGNUP_USER = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
    signupUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      jwt_token
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email,
      jwt_token
    }
  }
`;

export { SIGNUP_USER, LOGIN_USER };
