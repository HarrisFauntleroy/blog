import { Badge, Group } from "@mantine/core";
import Link from "next/link";

type PostTagsProperties = { tags?: string[] };

export const PostTags = ({ tags }: PostTagsProperties) => (
  <Group>
    {tags?.map((tag) => (
      <Link key={tag} href={`/posts/tags/${tag}`}>
        <Badge size="sm" variant="light">
          {tag}
        </Badge>
      </Link>
    ))}
  </Group>
);
