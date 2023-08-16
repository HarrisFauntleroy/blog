interface DefaultBranchReference {
  target: {
    history: {
      totalCount: number;
    };
  };
}

interface Collaborator {
  avatarUrl: string;
  login: string;
}
interface LanguageNode {
  nodes: { name: string; color: string }[];
}

export interface SortedRepositories {
  activeRepos: Repository[];
  archivedRepos: Repository[];
  templateRepos: Repository[];
}

export interface Commit {
  message: string;
  sha: string;
  url: string;
  author: {
    name: string;
    email: string;
  };
}

export interface PushEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: Array<{
      sha: string;
      author: {
        email: string;
        name: string;
      };
      message: string;
      distinct: boolean;
      url: string;
    }>;
  };
  public: boolean;
  created_at: string;
}

export interface Repository {
  id: string;
  name: string;
  openGraphImageUrl: string;
  url: string;
  description: string;
  homepageUrl: string;
  updatedAt: string;
  isArchived: boolean;
  isTemplate: boolean;
  stargazerCount: number;
  forkCount: number;
  commitCount: number;
  defaultBranchRef: DefaultBranchReference;
  collaborators: Collaborator[];
  languages: LanguageNode;
}

export interface RepositoryResponse {
  user: {
    repositories: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: Repository[];
    };
  };
}
