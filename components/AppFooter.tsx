import { ActionIcon, Footer, Group } from "@mantine/core";

import Link from "next/link";
import { GithubLogo, LinkedinLogo } from "phosphor-react";

export function AppFooter() {
  const links = [
    {
      title: "Github",
      href: "https://github.com/username",
      icon: <GithubLogo />,
      external: true,
    },
    {
      title: "Linkedin",
      href: "https://www.linkedin.com/in/username/",
      icon: <LinkedinLogo />,
      external: true,
    },
  ];

  return (
    <Footer
      height="32px"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Group>
        {links.map((link) => (
          <Link key={link.title} title={link.title} href={link.href}>
            <ActionIcon>{link?.icon}</ActionIcon>
          </Link>
        ))}
      </Group>
    </Footer>
  );
}
