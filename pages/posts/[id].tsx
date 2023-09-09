import { Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import dynamic from "next/dynamic";
import { useEffect } from "react";
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
  postData: PostType;
};

export default function Post({ postData }: PostProperties) {
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (postData.published === false) {
      window.location.href = "/posts";
    }
  }, [postData.published]);

  return (
    <Layout>
      <article>
        <Stack spacing="xs">
          <Title order={1} style={{ textTransform: "capitalize" }}>
            {postData?.title || "Untitled"}
          </Title>
          {postData?.description && (
            <Text size="sm">{postData.description}</Text>
          )}
          <Text size="sm" className={utilStyles.lightText}>
            Published:{" "}
            <Date
              className={utilStyles.lightText}
              dateString={postData?.date}
            />
          </Text>
          {postData?.tags && <PostTags tags={postData?.tags} />}
          <Markdown colorScheme={colorScheme} value={postData?.content} />
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
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
