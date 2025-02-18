import { gql } from '@apollo/client';

const CREATE_TASK = gql`
  mutation CreateTask($userId: ID!, $note: String!) {
    createTask(user_id: $userId, note: $note) {
      id
      user_id
      note
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      user_id
      note
    }
  }
`;

export { CREATE_TASK, DELETE_TASK };
