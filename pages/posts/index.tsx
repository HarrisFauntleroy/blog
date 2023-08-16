import { Layout } from "@/components/AppLayout";
import { PostTags } from "@/components/PostTags";
import Posts from "@/components/Posts";
import Title from "@/components/Title";
import { Post } from "@/lib/posts";
import { getAllTags, postsByTag } from "@/pages/api/posts/tags/[tag]";
import { Flex, Stack } from "@mantine/core";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Note, Tag } from "phosphor-react";
import { ReactNode } from "react";

type DateProps = {
  dateString: string;
  className?: string;
};

export function Date({ dateString, className }: DateProps) {
  const date = parseISO(dateString);
  return (
    <time className={className} dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}

type PostsProps = {
  tags: string[];
  posts: Post[];
  home?: boolean;
  children?: ReactNode;
};

export default function PostsPage({ tags, posts }: PostsProps) {
  return (
    <Layout>
      <Title label="Posts" icon={<Note />} />
      <Posts posts={posts} />
      <Stack>
        <Flex justify="space-between" align="center">
          <Title label="Tags" icon={<Tag />} />
          <Link href="/posts/tags">See all tags</Link>
        </Flex>
        <PostTags tags={tags} />
      </Stack>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = postsByTag();
  const tags = getAllTags(16);
  return {
    props: {
      posts,
      tags,
    },
  };
}
