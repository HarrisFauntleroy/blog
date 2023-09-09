import {
  Card,
  Flex,
  Image,
  List,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { Post } from "../lib/posts";
import { Date } from "./Date";

type PostsProperties = {
  posts: Post[];
  filterByTag?: string;
};

export default function Posts({ posts, filterByTag }: PostsProperties) {
  const filtered = posts.filter((post) => {
    if (filterByTag) {
      return post.tags.includes(filterByTag.toLowerCase());
    }
    return true;
  });
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 1 },
        { minWidth: "md", cols: 2 },
        { minWidth: "lg", cols: 3 },
        { minWidth: "xl", cols: 4 },
      ]}
    >
      {filtered?.map(({ id, createdAt, title, description, image }) => (
        <Card
          shadow="sm"
          radius="md"
          withBorder
          component={Link}
          display="flex"
          href={`/posts/${id}`}
          style={{ textTransform: "capitalize" }}
          key={id}
        >
          <Flex gap="16px" align="center" style={{ flex: 1 }}>
            <Image
              width={80}
              height={80}
              radius="md"
              src={image}
              alt={title}
              withPlaceholder
            />
            <List listStyleType="none">
              <List.Item>
                <Title order={6}>{title}</Title>
              </List.Item>
              <List.Item>
                <small>
                  <Date dateString={createdAt} />
                </small>
              </List.Item>
              <List.Item>
                <Text lineClamp={2} size="sm">
                  {description}
                </Text>
              </List.Item>
            </List>
          </Flex>
        </Card>
      ))}
    </SimpleGrid>
  );
}
