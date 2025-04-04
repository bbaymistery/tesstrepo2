import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        let pageProps = null;
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => {
                    pageProps = props.pageProps;

                    return <App {...props} />
                },
                enhanceComponent: (Component) => Component,
            })
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps, pageProps }
    }

    render() {
        return (
            <Html>
                <Head >
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" media="all" />

                    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                    <script src="https://tools.london-tech.com/scripts/datatable/min.js" rel='preload'></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>

            </Html>
        )
    }
}

export default CustomDocument;