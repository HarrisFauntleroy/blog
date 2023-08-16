import { getSortedPostsData } from "@/lib/posts";
import { NextApiRequest, NextApiResponse } from "next";

type PostsByTagOptions = { tag?: string; limit?: number };

export function postsByTag(tag?: string, options?: PostsByTagOptions) {
  const posts = getSortedPostsData();
  if (tag) {
    return posts
      .filter((post) =>
        post.tags?.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
      )
      .filter(Boolean);
  }
  return posts.slice(0, options?.limit);
}

export function getAllPosts(limit?: number) {
  return getSortedPostsData().slice(0, limit);
}

export function getAllTags(limit?: number) {
  const posts = getSortedPostsData();
  const tags = posts.flatMap((post) => post.tags).filter(Boolean);
  const uniqueTags = [...new Set(tags)];
  return uniqueTags.slice(0, limit);
}

export default function tagHandler(
  { query }: NextApiRequest,
  response: NextApiResponse
) {
  return response.status(200).json(postsByTag(query.tag as string));
}
