import { gql } from "graphql-request";

export const userRepositoriesQuery = gql`
  query GetUserRepositories($username: String!, $cursor: String) {
    user(login: $username) {
      repositories(
        first: 6
        after: $cursor
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          openGraphImageUrl
          name
          url
          description
          homepageUrl
          stargazerCount
          forkCount
          isArchived
          isTemplate
          updatedAt
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 0) {
                  totalCount
                }
              }
            }
          }
          collaborators(first: 10) {
            nodes {
              avatarUrl(size: 30)
              login
            }
          }
          languages(first: 10) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;
