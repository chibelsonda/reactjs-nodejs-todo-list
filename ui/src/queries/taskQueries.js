import { gql } from '@apollo/client';

const GET_TASKS = gql`
  query GetTasks($userId: ID!) {
    tasks(user_id: $userId) {
      id
      user_id
      note
    }
  }
`;

export { GET_TASKS };
