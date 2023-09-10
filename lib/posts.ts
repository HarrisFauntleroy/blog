import { readFileSync, readdirSync } from "fs";
import matter, { GrayMatterFile } from "gray-matter";
import path from "path";

function getPostFromFile(fileName: string): Post {
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  return buildPost(matterResult, id);
}

export type Post = {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  hidden?: boolean;
  description?: string;
  authors?: string[];
  image?: string;
  content: string;
};

export const buildPost = (
  matterResult: GrayMatterFile<string>,
  id?: string
): Post => {
  return {
    ...matterResult.data,
    id: matterResult.data.id || id,
    title: matterResult.data.title || "",
    published: matterResult.data.published || false,
    createdAt: matterResult.data.createdAt || "",
    updatedAt: matterResult.data.updatedAt || "",
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
  const allPosts = readdirSync(postsDirectory).map((fileName) =>
    getPostFromFile(fileName)
  );
  // Hidden posts can be published, for things I want off the feed
  const publishedPosts = allPosts.filter(
    (post) => post.published && !post.hidden
  );
  return publishedPosts.sort((a, b) => {
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}

interface GetAllPostsOptions {
  tag?: string;
  hidden?: boolean;
  published?: boolean;
  limit?: number;
}

export function getAllPosts(options?: GetAllPostsOptions) {
  const tag = options?.tag;
  const allPosts = readdirSync(postsDirectory).map((fileName) =>
    getPostFromFile(fileName)
  );

  if (tag) {
    const filteredPosts = allPosts.filter(
      (post) =>
        post.tags?.some((t: string) =>
          t.toLowerCase().includes(tag.toLowerCase())
        ) &&
        post?.hidden === options?.hidden &&
        post?.published === options?.published
    );
    return options?.limit
      ? filteredPosts.slice(0, options.limit)
      : filteredPosts;
  }

  const filteredPosts = allPosts.filter(
    (post) =>
      post.hidden === options?.hidden && post.published === options?.published
  );

  return options?.limit ? filteredPosts.slice(0, options.limit) : filteredPosts;
}

export function sortPostsByDate(): Post[] {
  const allPostsPublishedNotHidden = getAllPosts({
    published: true,
    hidden: false,
  });
  return allPostsPublishedNotHidden.sort((a, b) => {
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}

export function getAllPostIds() {
  const fileNames = readdirSync(postsDirectory);
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
  const fileContents = readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  return buildPost(matterResult, id);
}
