import { Layout } from "@/components/AppLayout";
import { PostTags } from "@/components/PostTags";
import { getAllTags } from "@/pages/api/posts/tags/[tag]";

type HomeProps = { tags: string[] };

export default function Home({ tags }: HomeProps) {
  return (
    <Layout>
      <PostTags tags={tags} />
    </Layout>
  );
}

export async function getStaticProps() {
  const tags = getAllTags();

  return {
    props: {
      tags,
    },
  };
}
