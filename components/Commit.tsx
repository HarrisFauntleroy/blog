import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { Commit } from "../lib/github/types";

export function CommitComponent(commit: Commit) {
  const parsed = marked(commit.message, { mangle: false, headerIds: false });
  const sanitized = sanitizeHtml(parsed);
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
        <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>
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
