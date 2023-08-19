import matter, { GrayMatterFile } from "gray-matter";
import fs, { readFileSync } from "node:fs";
import path from "node:path";

export type Post = {
  id: string;
  title: string;
  published: boolean;
  date: string;
  lastUpdated: Date;
  tags: string[];
  hidden?: boolean;
  description?: string;
  authors?: string[];
  image?: string;
  content: string;
};

type BuildPost = (matterResult: GrayMatterFile<string>, id?: string) => Post;

export const buildPost: BuildPost = (matterResult, id): Post => {
  return {
    ...matterResult.data,
    id: matterResult.data.id || id,
    title: matterResult.data.title || "",
    published: matterResult.data.published || false,
    date: matterResult.data.date || "",
    lastUpdated: matterResult.data.lastUpdated || "",
    tags: matterResult.data.tags || [],
    hidden: matterResult.data.hidden || false,
    description: matterResult.data.description || "",
    authors: matterResult.data.authors || [],
    image: matterResult.data.image || "",
    content: matterResult.content,
  };
};

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: Post[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const fileContents = readFileSync(fullPath, "utf8");
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    return buildPost(matterResult, id);
  });
  // Hidden posts can be published, for things I want off the feed
  const publishedPosts = allPostsData.filter(
    (post) => post.published && !post.hidden
  );
  return publishedPosts.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  return buildPost(matterResult, id);
}
