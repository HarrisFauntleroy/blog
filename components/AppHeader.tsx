import {
  ActionIcon,
  Avatar,
  Flex,
  Header,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import { Hamburger, MoonStars, Sun } from "phosphor-react";
import Breadcrumbs from "./Breadcrumb";

type AppHeaderProperties = {
  navigationHandlers?: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
};

export function AppHeader({ navigationHandlers }: AppHeaderProperties) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header
      height={{ base: 70 }}
      p="md"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Avatar alt="logo" />
      </Link>
      <Breadcrumbs />
      <Flex>
        <ActionIcon
          display={{ base: "flex", sm: "none" }}
          onClick={() => navigationHandlers?.toggle()}
        >
          <Hamburger />
        </ActionIcon>
        <ActionIcon
          title="Toggle color scheme or press mod+J"
          onClick={() => toggleColorScheme()}
        >
          {colorScheme === "dark" ? <Sun /> : <MoonStars />}
        </ActionIcon>
      </Flex>
    </Header>
  );
}
