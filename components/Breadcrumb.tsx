import {
  Anchor,
  Breadcrumbs as MantineBreadcrumbs,
  Text,
  Tooltip,
} from "@mantine/core";
import { useRouter } from "next/router";

export default function Breadcrumbs() {
  const router = useRouter();
  const trimmedPath = router.asPath.split("?")[0];
  const pathArray = trimmedPath.split("/").filter((item) => item);
  const currentPath = router.asPath;

  return (
    <Text
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        overflow: "scroll",
      }}
    >
      <MantineBreadcrumbs>
        <Tooltip label="/">
          <Anchor href="/">home</Anchor>
        </Tooltip>
        {pathArray?.map((item, index) => {
          const path = `/${pathArray.slice(0, index + 1).join("/")}`;

          return currentPath === path ? (
            <Text key={index}>{item}</Text>
          ) : (
            <Tooltip key={index} label={`Go to ${path}`}>
              <Anchor href={path}>{item}</Anchor>
            </Tooltip>
          );
        })}
      </MantineBreadcrumbs>
    </Text>
  );
}
