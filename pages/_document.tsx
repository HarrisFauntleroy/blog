import { ServerStyles, createStylesServer } from "@mantine/next";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

const stylesServer = createStylesServer();

export default class _Document extends Document {
  static async getInitialProps(context: DocumentContext) {
    const initialProperties = await Document.getInitialProps(context);

    return {
      ...initialProperties,
      styles: [
        initialProperties.styles,
        <ServerStyles
          html={initialProperties.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
