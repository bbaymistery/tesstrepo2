import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Footer from '../../widgets/Footer';
import { useSelector } from 'react-redux';
import TopHeader from '../../widgets/TopHeader';
import { LINKNAME_ROUTES, META_CONTENT_LINKNAME, seoDefaults } from '../../../constants/seoDefaults';
import { SOCIAL_MEDIA, META_CONTENT_HOME_PAGE, STATIC_ROUTES, } from '../../../constants/seoDefaults';

const GlobalLayout = ({ children, title = seoDefaults.title, description = seoDefaults.description, keywords = seoDefaults.keywords, footerbggray = seoDefaults.footerbggray, isVisible = seoDefaults.isVisible }) => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const state = useSelector(state => state.pickUpDropOffActions);
  const { params: { language } } = state;
  const websiteDomain = "https://www.airport-pickups-london.com";
  useEffect(() => {

    const loadChatWidget = () => {
      if (window.innerWidth > 990) {
        // If the window width is below 990px, do not load the chat widget
        const script1 = document.createElement('script');
        console.log("script1", script1);
        script1.id = "ze-snippet";
        script1.src = "https://static.zdassets.com/ekr/snippet.js?key=473f7b02-4850-4045-8010-1fedf9752180";
        script1.async = true;
        document.head.appendChild(script1); // Append to head

        const script2 = document.createElement('script');
        script2.src = "https://www.airport-pickups-london.com/js/chat_widget.js?112";
        script2.async = true;
        document.head.appendChild(script2); // Append to head
      }

    };

    const handleLoad = () => {
      console.log("11");

      setTimeout(loadChatWidget, 3000); // Delay loading chat widget by 3000ms after load
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="keywords" name="keywords" content={keywords} />
        <meta key="description" name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        {/* //alternates for terms abouts us aand other Static pages We dont need schema so we didnt include*/}
        {Object.entries(STATIC_ROUTES).map(([key, path]) =>
          router.pathname === path && (
            <React.Fragment key={key}>
              <link rel="canonical" href={`${websiteDomain}${path}`} />
              <link rel="alternate" hrefLang="tr" href={`${websiteDomain}/tr${path}`} />
              <link rel="alternate" hrefLang="ar" href={`${websiteDomain}/ar${path}`} />
              <link rel="alternate" hrefLang="es" href={`${websiteDomain}/es${path}`} />
              <link rel="alternate" hrefLang="it" href={`${websiteDomain}/it${path}`} />
              <link rel="alternate" hrefLang="ru" href={`${websiteDomain}/ru${path}`} />
              <link rel="alternate" hrefLang="zh" href={`${websiteDomain}/zh${path}`} />
              <link rel="alternate" hrefLang="x-default" href={`${websiteDomain}${path}`} />
            </React.Fragment>
          )
        )}


        {/* >>>Starting  [Linknname]  ALTERANTE CANONICAL configurations fFor all linknama query */}
        {Object.entries(LINKNAME_ROUTES).map(([key, path]) =>
          router.query.linkname === path && (
            <React.Fragment key={key}>
              <link rel="canonical" href={language === 'en' ? `${websiteDomain}/${path}` : `${websiteDomain}/${language}/${path}`} />
              <link rel="alternate" hrefLang="tr" href={`${websiteDomain}/tr/${path}`} />
              <link rel="alternate" hrefLang="ar" href={`${websiteDomain}/ar/${path}`} />
              <link rel="alternate" hrefLang="es" href={`${websiteDomain}/es/${path}`} />
              <link rel="alternate" hrefLang="it" href={`${websiteDomain}/it/${path}`} />
              <link rel="alternate" hrefLang="ru" href={`${websiteDomain}/ru/${path}`} />
              <link rel="alternate" hrefLang="zh" href={`${websiteDomain}/zh/${path}`} />
              <link rel="alternate" hrefLang="x-default" href={`${websiteDomain}/${path}`} />

              <meta property="og:title" content={META_CONTENT_LINKNAME[key][language].ogTitle} />
              <meta property="og:description" content={META_CONTENT_LINKNAME[key][language].ogDescription} />
              <meta property="og:url" content={`${websiteDomain}${META_CONTENT_LINKNAME[key][language]["schema"]["url"]}`} />
              <meta property="og:image" content={language === 'en' ? `${websiteDomain}/images/${META_CONTENT_LINKNAME[key][language].imageUrl}` : `${websiteDomain}/${language}/images/${META_CONTENT_LINKNAME[key][language].imageUrl}`} />

              <meta name="twitter:title" content={META_CONTENT_LINKNAME[key][language].twitterTitle} />
              <meta name="twitter:description" content={META_CONTENT_LINKNAME[key][language].twitterDescription} />
              <meta name="twitter:image" content={language === 'en' ? `${websiteDomain}/images/${META_CONTENT_LINKNAME[key][language].imageUrl}` : `${websiteDomain}/${language}/images/${META_CONTENT_LINKNAME[key][language].imageUrl}`} />
              <Script strategy='beforeInteractive' type="application/ld+json">
                {JSON.stringify({
                  "@context": "http://schema.org",
                  "@type": "WebPage",
                  "name": META_CONTENT_LINKNAME[key][language]["schema"]["name"],
                  "url": `${websiteDomain}${META_CONTENT_LINKNAME[key][language]["schema"]["url"]}`,
                  "sameAs": Object.values(SOCIAL_MEDIA),
                  "description": META_CONTENT_LINKNAME[key][language]["schema"]["description"],
                  "inLanguage": { language }
                }, null, 2)}
              </Script>
            </React.Fragment>
          )
        )}




        {/* //Site verification  */}
        <meta name={"google"} content={"_Cn8CYgXUWiRe05oCJj_l5OkyXza4K4nIuDWUPs8P2w"} />
        <meta name={"ms"} content={"41FC097AFD6E06774C838AC3D486664F"} />
        <meta name={"baidu"} content={"x5apENcEmp"} />
        <meta name={"verify_v1"} content={"KKDrUvNuL/YKcQ6PqTYbnH+UUOq0/lz/pJU/z7M+Ro4="} />

        {/* <StandardMetaTags currentYear={currentYear} /> */}
        <meta name="distribution" content="Global" />
        <meta name="copyright" content={`Copyright Airport-pickups-london.com ${currentYear}. All rights reserved.`} />
        <meta name="resource-type" content="document" />
        <meta name="author" content="Airport-pickups-london.com" />
        <meta name="language" content="en" />

        <meta property="og:site_name" content="Airport Pickups London" />
        <meta property="og:type" content="website" />
        {/* Browser Compatibility */}
        <meta httpEquiv="X-UA-Compatible" content="IE=9" />
        <meta httpEquiv="x-ua-compatible" content="IE=EmulateIE9" />
        {/* No follow */}
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Airport_Pickups" />

        {router.pathname === "/" && (
          <>
            {/* Open Graph and Twitter Cards */}
            <meta property="og:url" content={`${websiteDomain}${language === 'en' ? '' : `/${language}`}`} />
            <meta property="og:image" content={language === 'en' ? `${websiteDomain}/images/homeScreenImage.webp` : `${websiteDomain}/${language}/images/homeScreenImage.webp`} />
            <meta name="twitter:image" content={language === 'en' ? `${websiteDomain}/images/homeScreenImage.webp` : `${websiteDomain}/${language}/images/homeScreenImage.webp`} />
            <meta property="og:title" content={META_CONTENT_HOME_PAGE[language].ogTitle} />
            <meta property="og:description" content={META_CONTENT_HOME_PAGE[language].ogDescription} />
            <meta name="twitter:title" content={META_CONTENT_HOME_PAGE[language].twitterTitle} />
            <meta name="twitter:description" content={META_CONTENT_HOME_PAGE[language].twitterDescription} />
            <Script strategy='beforeInteractive' type="application/ld+json">
              {JSON.stringify({
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "Airport Pickups London",
                "url": `${language === "en" ? websiteDomain : `${websiteDomain}/${language}`}`,
                "sameAs": Object.values(SOCIAL_MEDIA),
                "inLanguage": { language }
              }, null, 2)}
            </Script>
          </>
        )}





      </Head>

      <TopHeader />
      <main>{children}</main>
      <Footer bggray={footerbggray} />
    </>
  );
};

export default GlobalLayout;
