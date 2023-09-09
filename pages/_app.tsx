import "@harrisfauntleroy/design-system/dist/index.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { getCookie, setCookie } from "cookies-next";
import NextApp, { AppContext, AppProps as NextAppProperties } from "next/app";
import { useState } from "react";

type AppProperties = NextAppProperties & { colorScheme: ColorScheme };

function App(properties: AppProperties) {
  const { Component, pageProps } = properties;

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    properties.colorScheme
  );

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
        <Component {...pageProps} />
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
