import { splitRepositories } from "../../components/UserRepositories";
import graphQLClient from "./client";
import GraphQLRequestError from "./errors/GraphQLRequestError";
import paginateRequest from "./helpers/paginateRequest";
import { userRepositoriesQuery } from "./queries/userRepositories";
import { Repository, SortedRepositories } from "./types";

const byCommitCount = (a: Repository, b: Repository) => {
  const commitCountA = a.defaultBranchRef?.target?.history?.totalCount || 0;
  const commitCountB = b.defaultBranchRef?.target?.history?.totalCount || 0;
  return commitCountB - commitCountA;
};

async function getUserRepositories(
  username: string
): Promise<SortedRepositories> {
  try {
    const repositories = await paginateRequest(
      graphQLClient,
      userRepositoriesQuery,
      {
        username,
      }
    );
    const sortedRepositories = repositories.sort(byCommitCount);
    return splitRepositories(sortedRepositories);
  } catch (error) {
    throw new GraphQLRequestError(
      "Error fetching user repositories",
      error as Error
    );
  }
}

export default getUserRepositories;
