import { Layout } from "@/components/AppLayout";
import Posts from "@/components/Posts";
import { Post } from "@/lib/posts";
import { getAllTags, postsByTag } from "@/pages/api/posts/tags/[tag]";
import Head from "next/head";

type TagPageProps = {
  posts: Post[];
  tag: string;
};

export default function TagPage({ posts, tag }: TagPageProps) {
  return (
    <Layout>
      <Head>
        <title>{tag}</title>
      </Head>
      <Posts posts={posts} />
    </Layout>
  );
}

type GetStaticProps = {
  params: { tag: string };
};

export async function getStaticProps({ params: { tag } }: GetStaticProps) {
  const posts = postsByTag(tag);
  return {
    props: {
      posts,
      tag,
    },
  };
}

export async function getStaticPaths() {
  const tags = getAllTags();
  const paths = tags.map((tag) => ({
    params: { tag },
  }));
  return { paths, fallback: false };
}
