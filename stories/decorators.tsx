import {
  ActionIcon,
  ColorScheme,
  ColorSchemeProvider,
  Divider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { StoryFn } from "@storybook/react";

export function ThemeWrapper(Story: StoryFn) {
  const mode = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "storybook-color-scheme",
    defaultValue: mode,
  });

  const toggleColorScheme = () => {
    const nextColorScheme = colorScheme === "dark" ? "light" : "dark";
    console.log(
      `Changing color scheme from ${colorScheme} -> ${nextColorScheme}`
    );
    setColorScheme(nextColorScheme);
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Story />
        <Divider />
        <ActionIcon variant="subtle" onClick={toggleColorScheme}>
          {colorScheme === "dark" ? "🌙" : "☀️"}
        </ActionIcon>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
