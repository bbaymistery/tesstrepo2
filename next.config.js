/** @type {import('next').NextConfig} */

async function getRoutes() {
  // fetch data here
  let languages = ["en"]
  try {
    let response = await fetch(`https://api.london-tech.com/app/en`).then((res) => res.json())
    if (response.status === 200) languages = response?.languages.map(language => language.value);
  } catch (error) { console.log(error); }
  
  let singleRoutes = languages.map(lang => ({ source: `/${lang}`, destination: '/', locale: false }));
 
  let allLangaugesAsString = languages.length > 1 ? languages.join("|") : "en" //en|tr|es|ar|it|zh|ru
 
  let linknameRoutes = [{ source: `/:lang(${allLangaugesAsString})/:path`, destination: '/:path', locale: false, }]
 
  // let toursRoutes = [{ source: `/:lang(${allLangaugesAsString})/tours/:link`, destination: '/tours/:link', locale: false, } ]

  // Rewrite rule to prevent doubling the language prefix
  let specificToursPageRoutes = [
    // Prevent adding language prefix again when clicking on a link
    { source: `/:lang(${allLangaugesAsString})/tours/:link`, destination: '/tours/:link', locale: false },

    // Case for listing all tours with a language prefix
    { source: `/:lang(${allLangaugesAsString})/tours`, destination: `/:lang/tours`, locale: false },
    
    // Case for specific tour pages without language prefix
    { source: `/tours/:link`, destination: '/tours/:link', locale: false },
  ];


  const rewriteRules = [
    ...singleRoutes,
    ...linknameRoutes,
    // ...toursRoutes,
    ...specificToursPageRoutes
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
    remotePatterns: [
      { hostname: 'api.london-tech.com' },
      { hostname: 'www.airport-pickups-london.com' },
    ],
  },
}

module.exports = nextConfig
