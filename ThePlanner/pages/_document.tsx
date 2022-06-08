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
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='description' content="Bija's task manager"></meta>
          {/* <link
            rel='preload'
            href='/fonts/montserrat-v23-latin-100'
            as='font'
            type='font/eot'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='fonts/carter-one-v15-latin-regular'
            as='font'
            type='font/eot'
            crossOrigin='anonymous'
          /> */}
        </Head>
        <body>
          {getColorModeInitScriptElement()}
          <Main />
          <NextScript />
          <div id='modal' />
          <div id='prompt' />
          <div id='notification' />
        </body>
      </Html>
    )
  }
}
