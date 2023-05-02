import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { getColorModeInitScriptElement } from '@xstyled/styled-components'
import { Fragment, ReactElement } from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: [
          <Fragment key="1">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }

  render(): ReactElement {
    return (
      <Html lang="en" data-theme="winter">
        <Head>
          <meta name="description" content="The planner"></meta>
        </Head>
        <body>
          {getColorModeInitScriptElement()}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
