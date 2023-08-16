import { GraphQLClient } from "graphql-request";
import { RepositoryResponse } from "../types";

async function paginateRequest(
  client: GraphQLClient,
  query: string,
  variables: Record<string, unknown>
): Promise<RepositoryResponse["user"]["repositories"]["nodes"]> {
  let repositories: RepositoryResponse["user"]["repositories"]["nodes"] = [];
  let hasNextPage = true;
  let cursor: string | undefined;

  while (hasNextPage) {
    const response = await client.request<RepositoryResponse>(query, {
      ...variables,
      cursor,
    });

    const { pageInfo, nodes } = response.user.repositories;

    const nonTemplateRepositories = nodes.filter((repo) => !repo.isTemplate);

    repositories = [...repositories, ...nonTemplateRepositories];
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }

  return repositories;
}

export default paginateRequest;
