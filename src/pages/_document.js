import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';
class CustomDocument extends Document {

    // This is a static method in the CustomDocument class that fetches initial properties before rendering the document.
    static async getInitialProps(ctx) {
        // Initialize an empty object to hold page-specific props.
        let pageProps = {};

        // Store the original renderPage function from the context.
        const originalRenderPage = ctx.renderPage;

        // Override the renderPage function to customize the rendering of the app and components.
        ctx.renderPage = () =>
            originalRenderPage({
                // Enhance the App component, allowing you to wrap the entire app with additional props or functionality.
                enhanceApp: (App) => (props) => {
                    return <App {...props} />
                },
                // Enhance individual components if needed, but in this case, we just return them as is.
                enhanceComponent: (Component) => Component,
            });

        // Call the original getInitialProps method from the Document class to get the initial props.
        const initialProps = await Document.getInitialProps(ctx);

        // Return the initial props provided by Document along with any custom pageProps we might have set.
        return { ...initialProps, pageProps };
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
    renderSchemaScripts(schemas) {
        return schemas?.length > 0 && schemas.map((schema, index) => (
            <Script key={index} type="application/ld+json" strategy='beforeInteractive'>
                {JSON.stringify(schema, null, 2)}
            </Script>
        ));
    }

    renderGoogleTagManagerScript(id) {
        return (
            <>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${id}');`
                }}>
                </script>
            </>
        );
    }
    render() {
        //here i am destructing props which i passed  with MyApp.getInitialProps
        let { schemaOfTaxiDeals, schemas, canonicalAlternates, mainCanonical = "", metaTags = [], toursDatas } = this?.props?.__NEXT_DATA__?.props?.pageProps
        let schemasOfPages = schemas || []//home page Terms and the rest page has different schemas 
        let alternates = canonicalAlternates || []
      

        //checking if datas comes from single tour (tours/link.js)
        if (toursDatas?.pagePathname) {
            schemasOfPages = toursDatas.schema
            metaTags = toursDatas.metaTags
        }

        return (
            <Html lang="en">
                <Head >
                    {/* //render schemas home page or taxi deals  */}
                    {this.renderSchemaScripts(schemaOfTaxiDeals)}
                    {this.renderSchemaScripts(schemasOfPages)}

                    {/* {alternates?.length > 0 && alternates.map((alternate, index) => <link rel="alternate" key={index} hrefLang={alternate.hrefLang} href={alternate.href} />)} */}
                    {/* {mainCanonical?.length > 0 && <link rel="canonical" href={mainCanonical} />} */}

                    {this.createMetaTagElements(metaTags)}

                    {/* below tags copied from aplcars.com website  */}
                    {/* <!-- Global site tagn (gtag.js) - Google Ads: 1036671229 --> */}
                    {this.renderGoogleTagManagerScript('AW-1036671229')}
                    {this.renderGoogleTagManagerScript('UA-7336181-1')}


                    {/* This script initializes  (GTM) by creating a data layer, setting the GTM start time, and asynchronously loading the GTM script with the container ID 'GTM-M8WXW8KC'. */}
                    <script dangerouslySetInnerHTML={{
                        __html: `
                       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                       new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                       j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                       'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                       })(window,document,'script','dataLayer','GTM-M8WXW8KC')
                      ` }}>
                    </script>
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
