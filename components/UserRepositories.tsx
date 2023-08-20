import {
  Badge,
  Card,
  Flex,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { formatDuration, intervalToDuration } from "date-fns";
import Image from "next/image";
import NextLink from "next/link";
import { GithubLogo, Link } from "phosphor-react";
import { useEffect, useState } from "react";
import {
  Commit,
  PushEvent,
  Repository,
  SortedRepositories,
} from "../lib/github/types";
import { Commits } from "./Commit";
import Languages from "./Languages";

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
    <Card>
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
  const updatedAt = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(repository.updatedAt),
    }),
    { format: ["years", "months", "days", "hours"] }
  );

  return (
    <Stack>
      <Title order={6}>{formatRepoName(repository.name)}</Title>
      <Text p={0} lineClamp={4}>
        {repository.description}
      </Text>
      <List listStyleType="none">
        {repository?.homepageUrl && (
          <List.Item>
            <NextLink href={repository.homepageUrl}>
              <Flex align="center" gap="8px">
                <Link />
                <Text truncate>{repository.homepageUrl}</Text>
              </Flex>
            </NextLink>
          </List.Item>
        )}
        {repository?.url && (
          <List.Item>
            <NextLink href={repository?.url}>
              <Flex align="center" gap="8px">
                <GithubLogo /> View source
              </Flex>
            </NextLink>
          </List.Item>
        )}
        {Boolean(repository.stargazerCount) && (
          <List.Item>
            <Text size="sm">⭐ {repository.stargazerCount}</Text>
          </List.Item>
        )}
        {Boolean(repository.forkCount) && (
          <List.Item>
            <Text size="sm">🍴 {repository.forkCount}</Text>
          </List.Item>
        )}
      </List>
      <Group>
        <Badge>{`Updated: ${updatedAt || "less than an hour"} ago`}</Badge>
        <Badge>
          Commits: {repository.defaultBranchRef?.target?.history?.totalCount}
        </Badge>
      </Group>
    </Stack>
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
    const name = repository.name.replace("HarrisFauntleroy/", "").toLowerCase();
    const commitsByAuthor = event.payload.commits.filter(({ author }) => {
      const emails = ["harrisfauntleroy@gmail.com"];
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

const getCommits = async (username: string): Promise<GroupedEvents> => {
  return getGithubEvents(username, "PushEvent")
    .then((events) => {
      return groupPushEvents(events);
    })
    .catch((error) => {
      console.error("Fetching commits failed:", error);
      return {};
    });
};

type RepositoryCardProps = { repository: Repository };

function RepositoryCard({ repository }: RepositoryCardProps) {
  const [commits, setCommits] = useState<GroupedEvents>({});

  useEffect(() => {
    getCommits("HarrisFauntleroy")
      .then((commits) => setCommits(commits))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Card shadow="sm" radius="md" withBorder>
      <RepositorySummary repository={repository} />
      {repository?.languages?.nodes.length > 0 && (
        <Languages languages={repository.languages.nodes} />
      )}
      {FEATURE_FLAG_SCREENSHOT && <Screenshot repository={repository} />}
      {/* // Maybe TODO: make a [repo] slug page, and show commits on per project pages */}
      {FEATURE_FLAG_COMMITS && (
        <Commits commits={commits[repository.name.toLowerCase()]?.commits} />
      )}
    </Card>
  );
}

function ArchivedRepo(repository: Repository) {
  return (
    <Text key={repository.name}>
      <a href={repository.url}>{formatRepoName(repository.name)}</a>,
    </Text>
  );
}

export const byCommitCount = (a: Repository, b: Repository) => {
  const commitCountA = a.defaultBranchRef?.target?.history?.totalCount || 0;
  const commitCountB = b.defaultBranchRef?.target?.history?.totalCount || 0;
  return commitCountB - commitCountA;
};

type UserRepositoriesProps = {
  repositories: Repository[];
  archivedRepositories?: Repository[];
};

export const UserRepositories = ({
  repositories,
  archivedRepositories,
}: UserRepositoriesProps) => {
  return (
    <Stack>
      <Title order={6}>Active Projects</Title>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: 1200, cols: 4 },
        ]}
      >
        {repositories?.length > 0
          ? repositories?.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))
          : "No repositories found..."}
      </SimpleGrid>
      {Boolean(archivedRepositories?.length) && (
        <Stack>
          <Title order={6}>Archived Projects</Title>
          <Group>[{archivedRepositories?.map(ArchivedRepo)}]</Group>
        </Stack>
      )}
    </Stack>
  );
};
