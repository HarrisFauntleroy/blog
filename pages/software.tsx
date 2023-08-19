import { Layout as MainLayout } from "@/components/AppLayout";
import Title from "@/components/Title";
import { UserRepositories } from "@/components/UserRepositories";
import { FloppyDisk } from "phosphor-react";

const Software = () => {
  return (
    <MainLayout>
      <Title label="Software" icon={<FloppyDisk />} />
      <UserRepositories repositories={[]} />
    </MainLayout>
  );
};

export default Software;
