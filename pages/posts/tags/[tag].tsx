import Head from "next/head";
import { Layout } from "../../../components/AppLayout";
import Posts from "../../../components/Posts";
import { Post } from "../../../lib/posts";
import { getAllTags, postsByTag } from "../../api/posts/tags/[tag]";

type TagPageProperties = {
  posts: Post[];
  tag: string;
};

export default function TagPage({ posts, tag }: TagPageProperties) {
  return (
    <Layout>
      <Head>
        <title>{tag}</title>
      </Head>
      <Posts posts={posts} />
    </Layout>
  );
}

type GetStaticProperties = {
  params: { tag: string };
};

export async function getStaticProps({ params: { tag } }: GetStaticProperties) {
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
