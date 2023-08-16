import { Stack } from "@mantine/core";
import { ReactNode } from "react";
import { HomeButton } from "./HomeButton";

type AppContentProps = {
  children: ReactNode;
  home?: boolean;
};

export function AppContent({ children, home }: AppContentProps) {
  return (
    <Stack h="100%" style={{ flex: 1 }}>
      <Stack style={{ flex: 1 }}>{children}</Stack>
      {!home && <HomeButton />}
    </Stack>
  );
}
