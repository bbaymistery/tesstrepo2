/** @type {import('next').NextConfig} */

async function getRoutes() {
  // fetch data here
  let languages = ["en"]
  try {
    const response = await fetch(`https://api.london-tech.com/app/en`).then((res) => res.json())
    if (response.status === 200) languages = response?.languages.map(language => language.value);
  } catch (error) { console.log(error); }
  const singleRoutes = languages.map(lang => ({ source: `/${lang}`, destination: '/', locale: false }));
  let allLangaugesAsString = languages.length > 1 ? languages.join("|") : "en" //en|tr|es|ar|it|zh|ru
  let linknameRoutes = [{ source: `/:lang(${allLangaugesAsString})/:path`, destination: '/:path', locale: false, }]
  let toursRoutes = [{ source: `/:lang(${allLangaugesAsString})/tours/:link`, destination: '/tours/:link', locale: false, }]
  // generate rewrite rules dynamically
  const rewriteRules = [
    // for each language, create a rewrite rule with the language code in the source path
    ...singleRoutes,
    //ornek olsun diye bu sekilde yazdik Pekcandan yolaca cikarak /kullar direk /aboutu gorseder
    {
      source: '/tr/kurallar',
      destination: '/terms',
      locale: false,
    },

    ...linknameRoutes,
    ...toursRoutes
  ];


  return rewriteRules
}

const nextConfig = {
  reactStrictMode: false,
  env: {
    mapApiKey: "AIzaSyDulwIwncfuxBve8MKXPIIPmPLRve6ySw8",
    NEXT_PUBLIC_GOOGLE_ANALYTICS: "G-S02J90JMSB",
  },
  // "assetPrefix": "https://https://aplairtest.netlify.app//",
  async rewrites() {
    const rules = await getRoutes();
    return rules;
  },
  async redirects() {
    return [
      {
        source: "/Heathrow",
        destination: "/heathrow-taxi-prices",
        permanent: true,
      },
      {
        source: "/Heathrow/london/Taxi-Prices.asp",
        destination: "/heathrow-taxi-prices",
        permanent: true,
      },
      {
        source: "/Heathrow/Heathrow-Taxi-Prices.asp",
        destination: "/heathrow-taxi-prices",
        permanent: true,
      },
      {
        source: "/London",
        destination: "/london-city-taxi-prices",
        permanent: true,
      },
      {
        source: "/City-Airport",
        destination: "/london-city-taxi-prices",
        permanent: true,
      },
      {
        source: "/City-Airport/London-City-Taxi-Prices.asp",
        destination: "/london-city-taxi-prices",
        permanent: true,
      },
      {
        source: "/Gatwick/Gatwick-Taxi-Prices.asp",
        destination: "/gatwick-taxi-prices",
        permanent: true,
      },
      {
        source: "/Gatwick",
        destination: "/gatwick-taxi-prices",
        permanent: true,
      },
      {
        source: "/Luton-Airport",
        destination: "/luton-taxi-prices",
        permanent: true,
      },
      {
        source: "/Luton-Airport/Luton-Taxi-Prices.asp",
        destination: "/luton-taxi-prices",
        permanent: true,
      },
      {
        source: "/Stansted",
        destination: "/stansted-taxi-prices",
        permanent: true,
      },
      {
        source: "/Stansted/Stansted-Taxi-Prices.asp",
        destination: "/stansted-taxi-prices",
        permanent: true,
      },
      {
        source: "/Cruise-taxi/Southampton",
        destination: "/southampton-cruise-taxi",
        permanent: true,
      },
      {
        source: "/Cruise-taxi/Dover",
        destination: "/dover-cruise-taxi",
        permanent: true,
      },
      {
        source: "/Cruise-taxi/Portsmouth",
        destination: "/portsmouth-taxi-prices",
        permanent: true,
      },
      {
        source: "/Cruise-taxi/Harwich",
        destination: "/harwich-taxi-prices",
        permanent: true,
      },
      {
        source: "/Contact_APL.asp",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/Terms.asp",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/Privacy_Policy.asp",
        destination: "/terms",
        permanent: true,
      },
      //!inside heathrow taxi deals
      {
        source: "/london/from-london-to-heathrow-taxi-transfer",
        destination: "/",
        permanent: true,
      },
      {
        source: "/london/from-london-to-heathrow-taxi-transfer.asp",
        destination: "/",
        permanent: true,
      }
      //!



    ]
  },
  images: {
    domains: ['api.london-tech.com', "www.airport-pickups-london.com"],
  },
}

module.exports = nextConfig
