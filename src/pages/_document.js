import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';
class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        let pageProps = {};
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => {
                    return <App {...props} />
                },
                enhanceComponent: (Component) => Component,
            })
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps, pageProps, }
    }
    createMetaTagElements(metaTags) {
        if (metaTags.length > 0) {
            return metaTags.map((tagString, index) => {
                const matches = tagString.match(/<meta [^>]+>/g);
                if (matches) {
                    return matches.map((metaTag, idx) => {
                        const props = {};
                        metaTag.replace(/(\w+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, (m, key, value) => {
                            props[key] = value;
                            return m;
                        });
                        return <meta {...props} key={`meta-${index}-${idx}`} />;
                    });
                }
                // For link tags
                const linkMatches = tagString.match(/<link [^>]+>/g);
                if (linkMatches) {
                    return linkMatches.map((linkTag, idx) => {
                        const props = {};
                        linkTag.replace(/(\w+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, (m, key, value) => {
                            props[key] = value;
                            return m;
                        });
                        return <link {...props} key={`link-${index}-${idx}`} />;
                    });
                }
                return null;
            });
        }
    }
    render() {
        //here i am destructing props which i passed  with MyApp.getInitialProps
        let { schemaOfTaxiDeals, schemas, canonicalAlternates, mainCanonical = "", metaTags = [] } = this?.props?.__NEXT_DATA__?.props?.pageProps//this comes from.[...pathname]
        let schemasOfPages = schemas || []//home page Terms and the rest page has different schemas 
        let alternates = canonicalAlternates || []

        return (
            <Html lang="en">
                <Head >
                    {/* {this?.props.pageProps.pathname ? <></> : <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap" />} */}
                    {schemaOfTaxiDeals?.length > 0 && schemaOfTaxiDeals?.map(((schema, index) => {
                        return <Script key={index} type="application/ld+json" strategy='beforeInteractive' >{JSON.stringify(schema, null, 2)}</Script>
                    }))}
                    {schemasOfPages?.length > 0 && schemasOfPages?.map(((schema, index) => {
                        return <Script key={index} type="application/ld+json" strategy='beforeInteractive' >{JSON.stringify(schema, null, 2)}</Script>
                    }))}
                    {alternates?.length > 0 && alternates.map((alternate, index) => <link rel="alternate" key={index} hrefLang={alternate.hrefLang} href={alternate.href} />)}
                    {mainCanonical?.length > 0 && <link rel="canonical" href={mainCanonical} />}
                    {this.createMetaTagElements(metaTags)}
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
