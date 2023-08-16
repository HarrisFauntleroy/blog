import matter from "gray-matter";
import fs, { readFileSync } from "node:fs";
import path from "node:path";

export type Post = {
  id: string;
  date: string;
  title?: string;
  description?: string;
  tags: string[];
  published: boolean;
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
    const fileContents = readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      ...matterResult.data,
      id: matterResult.data.id || id,
      date: matterResult.data.date || "",
      title: matterResult.data.title || "",
      description: matterResult.data.description || "",
      image: matterResult.data.image || "",
      tags: matterResult.data.tags || [],
      published: matterResult.data.published || false,
    };
  });
  const publishedPosts = allPostsData.filter((post) => post.published);
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

  return {
    id,
    contentHtml: matterResult.content,
    ...matterResult.data,
  };
}
