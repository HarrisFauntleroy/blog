import { Divider, List, Navbar } from "@mantine/core";

import Title from "@/components/Title";
import Link from "next/link";
import { FloppyDisk, LinkSimple, Note } from "phosphor-react";

type AppNavbarProps = {
  opened: boolean;
};

export function AppNavbar({ opened }: AppNavbarProps) {
  const links = [
    {
      title: "Posts",
      href: "/posts",
      icon: <Note />,
    },
    {
      title: "Software",
      href: "/software",
      icon: <FloppyDisk />,
    },
  ];

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <List>
        <Title label="Links" icon={<LinkSimple />} />
        <Divider my="4px" color="transparent" />
        {links.map((link) => (
          <Link key={link.title} href={link.href}>
            <List.Item icon={link?.icon}>{link.title}</List.Item>
          </Link>
        ))}
      </List>
    </Navbar>
  );
}
