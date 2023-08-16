import { Layout as MainLayout } from "@/components/AppLayout";
import { useDailyQuote } from "@/hooks/useDailyQuote";
import { Blockquote, Flex } from "@mantine/core";

const Quote = () => {
  const dailyQuote = useDailyQuote();

  return (
    <MainLayout>
      <Flex style={{ flex: 1 }}>
        <Blockquote cite={dailyQuote.cite}>{dailyQuote.quote}</Blockquote>
      </Flex>
    </MainLayout>
  );
};

export default Quote;
