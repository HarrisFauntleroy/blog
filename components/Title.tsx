import { Title as MantineTitle } from "@mantine/core";
import { ReactNode } from "react";

type TitleProps = {
  label: string;
  icon: ReactNode;
};

export default function Title({ label, icon }: TitleProps) {
  return (
    <MantineTitle
      order={3}
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      {label}
      {icon}
    </MantineTitle>
  );
}
