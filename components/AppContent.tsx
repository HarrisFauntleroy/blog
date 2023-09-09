import { Stack } from "@mantine/core";
import { ReactNode } from "react";
import { HomeButton } from "./HomeButton";

type AppContentProperties = {
  children: ReactNode;
  home?: boolean;
};

export function AppContent({ children, home }: AppContentProperties) {
  return (
    <Stack h="100%" style={{ flex: 1 }}>
      <Stack style={{ flex: 1 }}>{children}</Stack>
      {!home && <HomeButton />}
    </Stack>
  );
}
