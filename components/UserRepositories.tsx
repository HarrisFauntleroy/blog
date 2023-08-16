import Languages from "@/components/Languages";
import getUserRepositories from "@/lib/github/getUserRepositories";
import {
  Commit,
  PushEvent,
  Repository,
  SortedRepositories,
} from "@/lib/github/types";
import { Card, Stack, Text, Title } from "@mantine/core";
import { formatDuration, intervalToDuration } from "date-fns";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight } from "phosphor-react";
import { Commits } from "./Commit";

const FEATURE_FLAG_SCREENSHOT = process.env.FEATURE_FLAG_SCREENSHOT === "true";
const FEATURE_FLAG_COMMITS = process.env.FEATURE_FLAG_COMMITS === "true";

async function getGithubEvents(
  username: string,
  eventType: string
): Promise<PushEvent[]> {
  try {
    const url = new URL(`https://api.github.com/users/${username}/events`);
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: PushEvent[] = await response.json();
    return data?.filter((event) => event.type === eventType);
  } catch (error) {
    console.error("Fetching github events failed:", error);
    throw error;
  }
}

interface Properties {
  username: string;
}

export function formatRepoName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function sortByCommitCount(repositories: Repository[]) {
  return [...repositories].sort((a, b) => {
    const commitCountA = a.defaultBranchRef?.target?.history?.totalCount || 0;
    const commitCountB = b.defaultBranchRef?.target?.history?.totalCount || 0;
    return commitCountB - commitCountA;
  });
}

export function splitRepositories(
  repositories: Repository[]
): SortedRepositories {
  return repositories.reduce(
    (accumulator: SortedRepositories, repo) => {
      if (repo.isArchived) accumulator.archivedRepos.push(repo);
      else if (repo.isTemplate) accumulator.templateRepos.push(repo);
      else accumulator.activeRepos.push(repo);
      return accumulator;
    },
    { activeRepos: [], archivedRepos: [], templateRepos: [] }
  );
}

type ScreenshotProps = { repository: Repository };

function Screenshot({ repository }: ScreenshotProps) {
  return repository.homepageUrl ? (
    <Card className="p-8">
      <NextLink href={repository.url}>
        <Image
          width={1024}
          height={512}
          src={`${process.env.SCREENSHOT_API}?url=${repository.homepageUrl}`}
          alt="screenshot of repository homepage"
        />
      </NextLink>
    </Card>
  ) : (
    <></>
  );
}

type RepositorySummaryProps = { repository: Repository };

const RepositorySummary = ({ repository }: RepositorySummaryProps) => {
  const style =
    "text-white-600 inline-flex items-center rounded-mdpx-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10";

  const updatedAt = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(repository.updatedAt),
    }),
    { format: ["years", "months", "days", "hours"] }
  );

  return (
    <>
      <NextLink
        href={repository.url}
        className="text-slate-400 no-underline transition-colors hover:text-slate-200 hover:underline"
      >
        <Title order={3}>
          {formatRepoName(repository.name)} <ArrowUpRight />
        </Title>
      </NextLink>
      <Text>{repository.description}</Text>
      <Stack>
        {Boolean(repository.homepageUrl) && (
          <span className={style}>
            <a href={repository.homepageUrl}>🔗</a>
          </span>
        )}
        <span className={style}>
          {`Updated: ${updatedAt || "less than an hour"} ago`}
        </span>
        <span className={style}>
          Commits: {repository.defaultBranchRef?.target?.history?.totalCount}
        </span>
        {Boolean(repository.stargazerCount) && (
          <Text>⭐ {repository.stargazerCount}</Text>
        )}
        {Boolean(repository.forkCount) && (
          <Text>🍴 {repository.forkCount}</Text>
        )}
      </Stack>
    </>
  );
};

type Event = {
  id: number;
  commits: Commit[];
};

type GroupedEvents = {
  [key: string]: Event;
};

function groupPushEvents(pushEvents: PushEvent[]) {
  const groupedEvents: GroupedEvents = {};
  for (const event of pushEvents) {
    const repository = event.repo;
    const name = repository.name.replace("username/", "").toLowerCase();
    const commitsByAuthor = event.payload.commits.filter(({ author }) => {
      const emails = ["username@gmail.com"];
      return emails.includes(author.email);
    });
    if (groupedEvents[name]) {
      groupedEvents[name].commits.push(...commitsByAuthor);
    } else {
      groupedEvents[name] = {
        id: repository.id,
        commits: commitsByAuthor,
      };
    }
  }
  return groupedEvents;
}

const getCommits = async (username: string): Promise<GroupedEvents> =>
  getGithubEvents(username, "PushEvent")
    .then((events) => {
      return groupPushEvents(events);
    })
    .catch((error) => {
      console.error("Fetching commits failed:", error);
      return {};
    });

async function RepositoryCard(repository: Repository) {
  const commits = await getCommits("username");

  return (
    <Stack key={repository.name}>
      <RepositorySummary repository={repository} />
      <Languages languages={repository.languages.nodes} />
      {FEATURE_FLAG_SCREENSHOT && <Screenshot repository={repository} />}
      {FEATURE_FLAG_COMMITS && (
        <Commits commits={commits[repository.name.toLowerCase()]?.commits} />
      )}
    </Stack>
  );
}

function RepoComponent(repository: Repository) {
  return (
    <Text key={repository.name}>
      <a
        className="text-slate-400 underline transition-colors hover:text-slate-200"
        href={repository.url}
      >
        {formatRepoName(repository.name)}
      </a>
      ,
    </Text>
  );
}

const byCommitCount = (a: Repository, b: Repository) => {
  const commitCountA = a.defaultBranchRef?.target?.history?.totalCount || 0;
  const commitCountB = b.defaultBranchRef?.target?.history?.totalCount || 0;
  return commitCountB - commitCountA;
};

type UserRepositoriesProps = { repositories: Repository[] };

const UserRepositories = ({ repositories }: UserRepositoriesProps) => {
  return <Stack>{repositories?.map(RepositoryCard)}</Stack>;
};

export async function getStaticProps() {
  const repositories = await getUserRepositories("username");

  return {
    props: { repositories },
  };
}

export default UserRepositories;
