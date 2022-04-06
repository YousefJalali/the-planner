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
          <link
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
          />

          {/* <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Carter+One&family=DM+Sans:wght@400;500;700&family=Montserrat:wght@100;300;400;500;700&display=swap'
            rel='stylesheet'
          /> */}
        </Head>
        <body>
          {getColorModeInitScriptElement()}
          <Main />
          <NextScript />
          <div id='side-drawer' />
          <div id='modal' />
          <div id='notification' />
        </body>
      </Html>
    )
  }
}
