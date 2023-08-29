import { Divider, NavLink, Navbar } from "@mantine/core";

import Link from "next/link";
import { Notepad, Rss } from "phosphor-react";

type AppNavbarProps = {
  opened: boolean;
};

export function AppNavbar({ opened }: AppNavbarProps) {
  const links = [
    {
      title: "Posts",
      href: "/posts",
      icon: <Notepad />,
    },
    {
      title: "RSS",
      href: "/rss.xml",
      icon: <Rss />,
    },
  ];

  return (
    <Navbar
      p="8px"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Divider my="4px" color="transparent" />
      {links.map((link) => (
        <NavLink
          component={Link}
          key={link.title}
          href={link.href}
          icon={link?.icon}
          label={link.title}
        />
      ))}
    </Navbar>
  );
}
