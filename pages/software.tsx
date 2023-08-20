import { FloppyDisk } from "phosphor-react";
import { Layout as MainLayout } from "../components/AppLayout";
import Title from "../components/Title";
import { UserRepositories } from "../components/UserRepositories";

const Software = () => {
  return (
    <MainLayout>
      <Title label="Software" icon={<FloppyDisk />} />
      <UserRepositories repositories={[]} />
    </MainLayout>
  );
};

export default Software;
