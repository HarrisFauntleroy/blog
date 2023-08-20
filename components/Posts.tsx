import { Card, List, SimpleGrid, Text, Title } from "@mantine/core";
import Link from "next/link";
import { Post } from "../lib/posts";
import { Date } from "../pages/posts";

type PostsProps = { posts: Post[] };

export default function Posts({ posts }: PostsProps) {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 1 },
        { minWidth: "md", cols: 2 },
        { minWidth: "lg", cols: 3 },
        { minWidth: "xl", cols: 4 },
      ]}
    >
      {posts?.map(({ id, date, title, description }) => (
        <Card
          shadow="sm"
          radius="md"
          withBorder
          component={Link}
          href={`/posts/${id}`}
          style={{ textTransform: "capitalize" }}
          key={id}
        >
          {/* {image && (
            <Card.Section>
              <Image
                src={image}
                height={"auto"}
                width={"100%"}
                style={{ aspectRatio: "16/9" }}
                alt={title}
              />
            </Card.Section>
          )} */}
          <List listStyleType="none">
            <List.Item>
              <Title order={6}> {title}</Title>
            </List.Item>
            <List.Item>
              <small>
                <Date dateString={date} />
              </small>
            </List.Item>
            <List.Item>
              <Text lineClamp={2} size="sm">
                {description}
              </Text>
            </List.Item>
          </List>
        </Card>
      ))}
    </SimpleGrid>
  );
}
