import { Meta, StoryObj } from "@storybook/react";
import HomePage from "../pages/index";
import { ThemeWrapper } from "./decorators";

const meta: Meta<typeof HomePage> = {
  component: HomePage,
  decorators: [ThemeWrapper],
};

export default meta;

type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
  render: () => {
    return <HomePage posts={[]} />;
  },
};
