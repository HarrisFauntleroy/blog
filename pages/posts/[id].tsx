import { Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import dynamic from "next/dynamic";
import { Layout } from "../../components/AppLayout";
import Comments from "../../components/Comments";
import { PostTags } from "../../components/PostTags";
import { Post as PostType, getAllPostIds, getPostData } from "../../lib/posts";
import { Date } from "../../pages/posts";
import utilStyles from "../styles.module.scss";

const Markdown = dynamic(
  () =>
    import("@harrisfauntleroy/design-system").then(({ Markdown }) => Markdown),
  { ssr: false }
);

type PostProperties = {
  post: PostType;
};

export default function Post({ post }: PostProperties) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Layout>
      <article>
        <Stack spacing="xs">
          <Title order={1} style={{ textTransform: "capitalize" }}>
            {post?.title || "Untitled"}
          </Title>
          {post?.description && <Text size="sm">{post.description}</Text>}
          <Text size="sm" className={utilStyles.lightText}>
            Published:{" "}
            <Date
              className={utilStyles.lightText}
              dateString={post?.createdAt}
            />
          </Text>
          {post?.tags && <PostTags tags={post?.tags} />}
          <Markdown colorScheme={colorScheme} value={post?.content} />
          <Comments repo="HarrisFauntleroy/personal-blog-template" />
        </Stack>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

type GetStaticProperties = { params: { id: string } };

export async function getStaticProps({ params }: GetStaticProperties) {
  const post = await getPostData(params.id);

  if (!post.published) {
    return {
      // The notFound boolean allows the page to return a 404 status and 404 Page.
      // With notFound: true, the page will return a 404 even if there was a successfully generated page before.
      // This is meant to support use cases like user-generated content getting removed by its author.
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}
