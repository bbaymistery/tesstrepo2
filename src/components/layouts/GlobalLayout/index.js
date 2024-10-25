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

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta  key="keywords" name="keywords" content={keywords} />
        <meta key="description" name="description" content={description} />
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
        {router.pathname === '/' && <link rel="alternate" hreflang="it" href={`${websiteDomain}/it`} />}
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
        {/*    <!-- Twitter/X Meta Tags for the Home Page (Turkish) --> */}
        {language === 'tr' && router.pathname === '/' && <meta name="twitter:title" content="Airport Pickups London | Güvenilir Havalimanı Taksi ve Transfer Hizmeti" />}
        {language === 'tr' && router.pathname === '/' && <meta name="twitter:description" content="Heathrow, Gatwick, Stansted ve Luton'dan profesyonel havaalanı taksi transferleri. Şimdi stresiz bir yolculuk için rezervasyon yapın." />}

        {/* //?Arabic */}
        {language === 'ar' && router.pathname === '/' && <meta property="og:title" content="Airport Pickups London | خدمة تاكسي ونقل موثوقة من المطار" />}
        {language === 'ar' && router.pathname === '/' && <meta property="og:description" content="تقدم Airport Pickups London خدمات نقل موثوقة ومهنية وخالية من المتاعب من مطارات لندن بما في ذلك هيثرو، جاتويك، ستانستيد، لوتون و City Airport. احجز الآن لرحلة خالية من القلق." />}
        {/*    <!-- Twitter/X Meta Tags for the Home Page (Arabic) --> */}
        {language === 'ar' && router.pathname === '/' && <meta name="twitter:title" content="Airport Pickups London | خدمة تاكسي ونقل موثوقة من المطار" />}
        {language === 'ar' && router.pathname === '/' && <meta name="twitter:description" content="نقل تاكسي موثوق من مطارات لندن: هيثرو، جاتويك، ستانستيد، ولوتون. احجز الآن لرحلة خالية من المتاعب." />}


        {/* //?Spanish */}
        {language === 'es' && router.pathname === '/' && <meta property="og:title" content="Airport Pickups London | Servicio de taxi y traslado fiable del aeropuerto" />}
        {language === 'es' && router.pathname === '/' && <meta property="og:description" content="Airport Pickups London ofrece traslados fiables, profesionales y sin complicaciones desde los aeropuertos de Londres, incluidos Heathrow, Gatwick, Stansted, Luton y City Airport. Reserve ahora para un viaje sin estrés." />}
        {/*    <!-- Twitter/X Meta Tags for the Home Page (Spanish) --> */}
        {language === 'es' && router.pathname === '/' && <meta name="twitter:title" content="Airport Pickups London | Servicio de taxi y traslado fiable del aeropuerto" />}
        {language === 'es' && router.pathname === '/' && <meta name="twitter:description" content="Traslados en taxi confiables desde Heathrow, Gatwick, Stansted y Luton. Reserve ahora para un viaje sin estrés." />}

        {/* //?Italian */}
        {language === 'it' && router.pathname === '/' && <meta name="og:title" content="Airport Pickups London | Servizio di taxi e trasferimento affidabile dall'aeroporto" />}
        {language === 'it' && router.pathname === '/' && <meta name="og:description" content="Airport Pickups London offre trasferimenti aeroportuali affidabili, professionali e senza problemi da Heathrow, Gatwick, Stansted, Luton e City Airport. Prenota ora per un viaggio senza stress." />}
        {/*    <!-- Twitter/X Meta Tags for the Home Page (Italian) --> */}
        {language === 'it' && router.pathname === '/' && <meta name="twitter:title" content="Airport Pickups London | Servizio di taxi e trasferimento affidabile dall'aeroporto" />}
        {language === 'it' && router.pathname === '/' && <meta name="twitter:description" content="Trasferimenti in taxi affidabili da Heathrow, Gatwick, Stansted e Luton. Prenota ora per un viaggio senza stress." />}

        {/* //?Russian */}
        {language === 'ru' && router.pathname === '/' && <meta name="og:title" content="Airport Pickups London | Надежный такси-сервис и трансферы из аэропорта" />}
        {language === 'ru' && router.pathname === '/' && <meta name="og:description" content="Airport Pickups London предлагает надежные, профессиональные и удобные трансферы из аэропортов Лондона, включая Хитроу, Гатвик, Станстед, Лутон и City Airport. Забронируйте сейчас для беспроблемной поездки." />}
        {/*    <!-- Twitter/X Meta Tags for the Home Page (Russian) --> */}
        {language === 'ru' && router.pathname === '/' && <meta name="twitter:title" content="Airport Pickups London | Надежный такси-сервис и трансферы из аэропорта" />}
        {language === 'ru' && router.pathname === '/' && <meta name="twitter:description" content="Надежные и удобные такси-трансферы из аэропортов Лондона: Хитроу, Гатвик, Станстед и Лутон. Забронируйте сейчас для беспроблемной поездки." />}

        {/* //?Chinise */}
        {language === 'zh' && router.pathname === '/' && <meta name="og:title" content="Airport Pickups London | 可靠的机场出租车及接送服务" />}
        {language === 'zh' && router.pathname === '/' && <meta name="og:description" content="Airport Pickups London 提供从伦敦希思罗机场、盖特威克机场、斯坦斯特德机场、卢顿机场及City机场的可靠、专业、无忧接送服务。现在预订，享受无忧旅程。" />}
        {/*    <!-- Twitter/X Meta Tags for the Home Page (Chinise) --> */}
        {language === 'zh' && router.pathname === '/' && <meta name="twitter:title" content="Airport Pickups London | 可靠的机场出租车及接送服务" />}
        {language === 'zh' && router.pathname === '/' && <meta name="twitter:description" content="从伦敦的希思罗、盖特威克、斯坦斯特德及卢顿机场提供的可靠出租车接送服务。现在预订，享受无忧旅程。" />}



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
