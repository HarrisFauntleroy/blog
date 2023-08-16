import { Text, Tooltip } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export const BackButton = () => {
  const router = useRouter();
  const pathArray = router.asPath.split("/");
  pathArray.pop();
  const newPath = pathArray.join("/") || "/";

  return (
    <Tooltip label={`Back to ${newPath}`}>
      <Link href={newPath} style={{ textDecoration: "underline" }}>
        <Text>← Go Back </Text>
      </Link>
    </Tooltip>
  );
};
