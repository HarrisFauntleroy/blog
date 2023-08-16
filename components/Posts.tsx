import { Post } from "@/lib/posts";
import { Date } from "@/pages/posts";
import styles from "@/pages/styles.module.scss";
import { Card, List } from "@mantine/core";
import Link from "next/link";

type PostsProps = { posts: Post[] };

export default function Posts({ posts }: PostsProps) {
  return (
    <List className={styles.list}>
      {posts?.map(({ id, date, title, description }) => (
        <Card
          component={Link}
          href={`/posts/${id}`}
          style={{ textTransform: "capitalize" }}
          key={id}
          className={styles.listItem}
        >
          <List.Item>
            {title}
            <br />
            <small>
              <Date dateString={date} />
            </small>
            <br />
            <small>{description}</small>
          </List.Item>
        </Card>
      ))}
    </List>
  );
}
