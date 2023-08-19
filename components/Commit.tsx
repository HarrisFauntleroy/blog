import { useMantineColorScheme } from "@mantine/core";
import dynamic from "next/dynamic";
import { Commit } from "../lib/github/types";

const Markdown = dynamic(
  () =>
    import("@harrisfauntleroy/design-system").then(({ Markdown }) => Markdown),
  { ssr: false }
);

export function CommitComponent(commit: Commit) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <li
      key={commit.sha}
      style={{
        borderRadius: "5px",
        margin: "5px 0",
      }}
      className="border-slate-400p-[8px] rounded-md border-2 "
    >
      <a
        href={commit.url}
        style={{ color: "#586069", textDecoration: "none" }}
        className="bg-[#fafaf9]"
      >
        <Markdown colorScheme={colorScheme} source={commit.message} />
      </a>
      <div style={{ color: "#586069", fontSize: "12px", marginTop: "8px" }}>
        <span>Author: {commit.author.name}</span>
        <span style={{ marginLeft: "10px" }}>Email: {commit.author.email}</span>
      </div>
    </li>
  );
}

type CommitsProps = {
  commits: Commit[];
  max?: number;
};

export function Commits({ commits, max = -1 }: CommitsProps) {
  return <ol>{commits?.slice(0, max).map(CommitComponent)}</ol>;
}
