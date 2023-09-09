import { AppShell, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { AppContent } from "./AppContent";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { AppNavbar } from "./AppNavbar";

type LayoutProperties = {
  children: ReactNode;
  home?: boolean;
};

export function Layout({ children, home }: LayoutProperties) {
  const theme = useMantineTheme();
  const [opened, handlers] = useDisclosure();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppNavbar opened={opened} />}
      // aside={<AppAside />} not yet implemented
      header={<AppHeader navigationHandlers={handlers} />}
      footer={<AppFooter />}
    >
      <AppContent home={home}>{children}</AppContent>
    </AppShell>
  );
}
