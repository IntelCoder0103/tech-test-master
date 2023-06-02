import { gql } from 'apollo-boost'
export const DELETE_COURSE = gql`
  mutation ($id: ID!) {
    deleteCourseResult(id: $id)
  }
`;

export const CREATE_COURSE = gql`
  mutation ($name: String!, $score: Int!, $learnerId: ID!) {
    createCourseResult(name: $name, score: $score, learnerId: $learnerId) {
      id
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation ($id: ID!, $name: String!, $score: Int!, $learnerId: ID!) {
    updateCourseResult(
      id: $id
      name: $name
      score: $score
      learnerId: $learnerId
    ) {
      id
    }
  }
`;
