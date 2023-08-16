import { Layout as MainLayout } from "@/components/AppLayout";
import Title from "@/components/Title";
import { FloppyDisk } from "phosphor-react";

const Software = () => {
  return (
    <MainLayout>
      <Title label="Software" icon={<FloppyDisk />} />
    </MainLayout>
  );
};

export default Software;
