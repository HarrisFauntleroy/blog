import { Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export const HomeButton = () => {
  const router = useRouter();
  const pathArray = router.pathname.split("/");
  pathArray.pop();
  const newPath = pathArray.join("/") || "/";

  return (
    <Link href="/" style={{ textDecoration: "underline", marginLeft: "auto" }}>
      <Text>← Back to home</Text>
    </Link>
  );
};
