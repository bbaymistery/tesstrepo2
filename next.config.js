/** @type {import('next').NextConfig} */

const { urls } = require('./src/resources/urls');


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
    return Object.entries(urls).map(([source, destination]) => {
      if (destination === '<check-point>') {
        return null; // Skipping those routes marked as '<check-point>'
      }
      return {
        source,
        destination,
        permanent: true, // Set as permanent redirect
      };
    }).filter(Boolean); // Filter out null values for skipped routes
  },
  images: {
    remotePatterns: [
      { hostname: 'api.london-tech.com' },
      { hostname: 'www.airport-pickups-london.com' },
      { hostname: 'api-backup.london-tech.com' },
    ],
  },
}

module.exports = nextConfig
