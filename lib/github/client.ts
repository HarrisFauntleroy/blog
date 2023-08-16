import { GraphQLClient } from "graphql-request";

const GITHUB_API_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error("GitHub token not set!");
}

const graphQLClient = new GraphQLClient(GITHUB_API_ENDPOINT, {
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export default graphQLClient;
