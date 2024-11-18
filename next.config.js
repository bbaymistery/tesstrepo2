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

  let toursRoutes = [{ source: `/:lang(${allLangaugesAsString})/tours/:link`, destination: '/tours/:link', locale: false, }]

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
    ...toursRoutes,
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
  async rewrites() {
    const rules = await getRoutes();
    return rules;
  },
  async redirects() {
    const isExcluded = (source) => {
      const lowerCaseSource = String(source).toLowerCase();
      return !lowerCaseSource.includes('/news') && !lowerCaseSource.includes('/blog');
    };

    // Filter and map ASP URLs
    const aspUrls = Object.entries(urls).filter(([source]) => isExcluded(source)).map(([source, destination]) => ({ source, destination, permanent: true, }));

    // Filter and map HTML URLs
    const htmlUrls = Object.entries(urls).filter(([source]) => isExcluded(source)).map(([source, destination]) => ({ source: source.includes('.asp') ? source.replace('.asp', '.html') : source, destination, permanent: true, }));

    // Extra redirects (if any)
    const axtraReDirection = [];

    // Combine all redirects
    return [...aspUrls, ...htmlUrls, ...axtraReDirection];
  }
  ,
  images: {
    remotePatterns: [
      { hostname: 'api.london-tech.com' },
      { hostname: 'www.airport-pickups-london.com' },
      { hostname: 'api-backup.london-tech.com' },
    ],
    formats: ['image/webp',],
  },
}

module.exports = nextConfig
