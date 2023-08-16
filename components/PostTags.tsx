import { Badge, Group } from "@mantine/core";
import Link from "next/link";

type PostTagsProps = { tags?: string[] };

export const PostTags = ({ tags }: PostTagsProps) => (
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
