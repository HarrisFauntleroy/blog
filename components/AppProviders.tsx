import "@harrisfauntleroy/design-system/dist/index.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { getCookie, setCookie } from "cookies-next";
import NextApp, { AppContext } from "next/app";
import { ReactNode, useState } from "react";

type AppProvidersProperties = { children?: ReactNode; lol: ColorScheme };

function App({ children, lol }: AppProvidersProperties) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(lol);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
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
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;

App.getInitialProps = async (appContext: AppContext) => {
  const appProperties = await NextApp.getInitialProps(appContext);
  return {
    ...appProperties,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
  };
};
