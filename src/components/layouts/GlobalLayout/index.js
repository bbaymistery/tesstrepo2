import React, { useEffect } from 'react'
import Head from 'next/head';
import TopHeader from '../../widgets/TopHeader';
import { useRouter } from 'next/router';
import { seoDefaults } from '../../../constants/seoDefaults';
import Footer from '../../widgets/Footer';
import { useSelector } from 'react-redux';
import { fetchConfig } from '../../../resources/getEnvConfig';
const GlobalLayout = ({ children, title = seoDefaults.title, description = seoDefaults.description, keywords = seoDefaults.keywords, footerbggray = seoDefaults.footerbggray, isVisible = seoDefaults.isVisible }) => {
  const currentYear = new Date().getFullYear(); // Get the current year
  const router = useRouter()
  const state = useSelector(state => state.pickUpDropOffActions)
  let { params: { language } } = state
  // Fetch environment config for dynamic URL
  const [envConfig, setEnvConfig] = React.useState(null);

  useEffect(() => {
    async function fetchEnvData() {
      const env = await fetchConfig();
      setEnvConfig(env);
    }
    fetchEnvData();
  }, []);
  useEffect(() => {

  }, [description, keywords])

  if (!envConfig) {
    return null; // Prevent rendering until envConfig is fetched
  }

  const websiteDomain = envConfig.websiteDomain;
  console.log({ websiteDomain, language, pathname: router.pathname });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 " />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        {/*//?Directly copied from aplcars.com */}
        <meta name="verify-v1" content="KKDrUvNuL/YKcQ6PqTYbnH+UUOq0/lz/pJU/z7M+Ro4=" />
        <meta name="baidu-site-verification" content="x5apENcEmp" />
        <meta name="distribution" content="Global" />
        <meta name="copyright" content={`Copyright Airport-pickups-london.com ${currentYear}. All rights reserved.`} />
        <meta name="resource-type" content="document" />
        <meta name="author" content="Airport-pickups-london.com" />
        <meta name="language" content="en" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="google-site-verification" content="_Cn8CYgXUWiRe05oCJj_l5OkyXza4K4nIuDWUPs8P2w" />
        <meta name="msvalidate.01" content="41FC097AFD6E06774C838AC3D486664F" />
        <meta httpEquiv="X-UA-Compatible" content="IE=9" />
        <meta httpEquiv="x-ua-compatible" content="IE=EmulateIE9" />

        {/*    by default everything is the same for all language except canonical   it changes by language  */}
        {router.pathname === '/' && <link rel="canonical" href={language === 'en' ? `${websiteDomain}/` : `${websiteDomain}/${language}`} />}
        {router.pathname === '/' && <link rel="alternate" hreflang="zh" href={`${websiteDomain}/zh`} />}
        {router.pathname === '/' && <link rel="alternate" hreflang="ru" href={`${websiteDomain}/ru`} />}
        {router.pathname === '/' && <link rel="alternate" hreflang="es" href={`${websiteDomain}/es`} />}
        {router.pathname === '/' && <link rel="alternate" hreflang="tr" href={`${websiteDomain}/tr`} />}
        {router.pathname === '/' && <link rel="alternate" hreflang="ar" href={`${websiteDomain}/ar`} />}
        {router.pathname === '/' && <link rel="alternate" hreflang="x-default" href={`${websiteDomain}/`} />}

        {/*   //!Generally same   Meta Tags for the Home Page  */}
        {router.pathname === '/' && <meta property="og:type" content="website" />}
        {router.pathname === '/' && <meta property="og:url" content={language === 'en' ? `${websiteDomain}/` : `${websiteDomain}/${language}`} />}
        {router.pathname === '/' && <meta property="og:image" content={`${websiteDomain}/images/homeScreenImage.webp`} />}
        {router.pathname === '/' && <meta property="og:site_name" content="Airport Pickups London" />}

        {/*  //!Generally same   Twitter cards  */}
        {router.pathname === '/' && <meta name="twitter:card" content="summary_large_image" />}
        {router.pathname === '/' && <meta name="twitter:site" content="@Airport_Pickups" />}
        {router.pathname === '/' && <meta name="twitter:image" content={`${websiteDomain}/images/homeScreenImage.webp`} />}


        {/* <!-- Meta Tags for the Home Page (English) --> */}
        {language === 'en' && router.pathname === '/' && <meta property="og:title" content="Airport Pickups London | Reliable Airport Taxi & Transfer Service" />}
        {language === 'en' && router.pathname === '/' && <meta property="og:description" content="Airport Pickups London offers reliable, professional, and hassle-free airport transfers across London, including Heathrow, Gatwick, Stansted, Luton, and City Airport. Book online for stress-free travel." />}

        {/*    <!-- Twitter/X Meta Tags for the Home Page (English) --> */}

        {language === 'en' && router.pathname === '/' && <meta name="twitter:title" content="Airport Pickups London | Reliable Airport Taxi & Transfer Service" />}
        {language === 'en' && router.pathname === '/' && <meta name="twitter:description" content="Reliable airport taxi transfers across London from Heathrow, Gatwick, Stansted, and Luton. Book now for professional service and stress-free travel." />}


        {/* //?Turkish */}
        {language === 'tr' && router.pathname === '/' && <meta property="og:title" content="Airport Pickups London | Güvenilir Havalimanı Taksi ve Transfer Hizmeti" />}
        {language === 'tr' && router.pathname === '/' && <meta property="og:description" content="Airport Pickups London, Heathrow, Gatwick, Stansted, Luton ve City Havalimanları için güvenilir ve profesyonel havaalanı transfer hizmetleri sunar. Stresiz bir seyahat için şimdi rezervasyon yapın." />}
        {/*    <!-- Twitter/X Meta Tags for the Home Page (English) --> */}
        {language === 'tr' && router.pathname === '/' && <meta name="twitter:title" content="Airport Pickups London | Güvenilir Havalimanı Taksi ve Transfer Hizmeti" />}
        {language === 'tr' && router.pathname === '/' && <meta name="twitter:description" content="Heathrow, Gatwick, Stansted ve Luton'dan profesyonel havaalanı taksi transferleri. Şimdi stresiz bir yolculuk için rezervasyon yapın." />}




        {/* Structured data  */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Airport Pickups London",
            "url": `${language === "en" ? "https://www.airport-pickups-london.com" : "https://www.airport-pickups-london.com/" + language}`,
            "sameAs": [
              "https://x.com/Airport_Pickups",
              "https://www.instagram.com/airport_pickups_london",
              "https://www.facebook.com/AirportPickupsLondon"
            ],
            "inLanguage": { language }
          }, null, 2)}
        </script>



        {/*//? no follow  */}
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex" />
        <link rel="preload" href="/images/others/advisorTrip.webp" as="image" type="image/webp" />
        {(router.pathname === "/") ? <link rel="stylesheet" href="/fontawesome/css/all.min.css" /> : <link rel="stylesheet" href="/fontawesomeAll/css/all.min.css" />}
      </Head>
      <TopHeader />

      <main>
        {children}
      </main>
      <Footer bggray={footerbggray} />
    </>
  )
}

export default GlobalLayout
