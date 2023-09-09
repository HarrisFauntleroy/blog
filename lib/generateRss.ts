import { writeFileSync } from "node:fs";
import RSS, { type FeedOptions } from "rss";
import { postsByTag } from "../pages/api/posts/tags/[tag]";

export default async function generateRssFeed() {
  const site_url =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : "https://personal-blog-template-lac.vercel.app";

  const allPosts = postsByTag();

  const feedOptions: FeedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Personal blog template",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date().getDate().toString(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
  };

  const feed = new RSS(feedOptions);

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description || "",
      url: `${site_url}/posts/${post.id}`,
      date: post.date,
    });
  });

  writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
