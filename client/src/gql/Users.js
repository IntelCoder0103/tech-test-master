import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    users {
      id
      firstName
      lastName
      email
      courseResults {
        id
        name
        score
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const CREATE_USER = gql`
  mutation ($firstName: String!, $lastName: String!, $email: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation (
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      id
    }
  }
`;
