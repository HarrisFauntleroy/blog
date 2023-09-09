import { Title as MantineTitle } from "@mantine/core";
import { ReactNode } from "react";

type TitleProperties = {
  label: string;
  icon: ReactNode;
};

export default function Title({ label, icon }: TitleProperties) {
  return (
    <MantineTitle
      order={2}
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      {label}
      {icon}
    </MantineTitle>
  );
}
