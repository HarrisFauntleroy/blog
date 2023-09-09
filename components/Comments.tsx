import { useMantineColorScheme } from "@mantine/core";
import { useEffect } from "react";

type CommentsProperties = {
  repo: string;
};

function Comments({ repo }: CommentsProperties) {
  const COMMENT_NODE_ID = "comments";
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute(
      "theme",
      colorScheme === "dark" ? "github-dark" : "github-light"
    );
    script.setAttribute("crossorigin", "anonymous");

    const comments = document.getElementById(COMMENT_NODE_ID);
    if (comments) comments.append(script);

    return () => {
      const comments = document.getElementById(COMMENT_NODE_ID);
      if (comments) comments.innerHTML = "";
    };
  }, [repo, colorScheme]);

  return <div id={COMMENT_NODE_ID} />;
}

export default Comments;
