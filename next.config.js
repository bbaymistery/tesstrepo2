/** @type {import('next').NextConfig} */

const { urls } = require('./src/resources/urls');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // ANALYZE env değişkenine göre aktifleşir
});

async function getRoutes() {
  let languages = ["en"];
  try {
    let response = await fetch(`https://api.london-tech.com/app/en`).then((res) => res.json());
    if (response.status === 200) languages = response?.languages.map(language => language.value);
  } catch (error) {
    console.log(error);
  }

  let singleRoutes = languages.map(lang => ({ source: `/${lang}`, destination: '/', locale: false }));

  let allLangaugesAsString = languages.length > 1 ? languages.join("|") : "en"; //en|tr|es|ar|it|zh|ru

  let linknameRoutes = [{ source: `/:lang(${allLangaugesAsString})/:path`, destination: '/:path', locale: false }];

  let toursRoutes = [{ source: `/:lang(${allLangaugesAsString})/tours/:link`, destination: '/tours/:link', locale: false }];

  let specificToursPageRoutes = [
    { source: `/:lang(${allLangaugesAsString})/tours/:link`, destination: '/tours/:link', locale: false },
    { source: `/:lang(${allLangaugesAsString})/tours`, destination: `/:lang/tours`, locale: false },
    { source: `/tours/:link`, destination: '/tours/:link', locale: false },
  ];

  const rewriteRules = [
    ...singleRoutes,
    ...linknameRoutes,
    ...toursRoutes,
    ...specificToursPageRoutes,
  ];
  return rewriteRules;
}

const nextConfig = withBundleAnalyzer({
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

    const aspUrls = Object.entries(urls)
      .filter(([source]) => isExcluded(source))
      .map(([source, destination]) => ({ source, destination, permanent: true }));

    const htmlUrls = Object.entries(urls)
      .filter(([source]) => isExcluded(source))
      .map(([source, destination]) => ({
        source: source.includes('.asp') ? source.replace('.asp', '.html') : source,
        destination,
        permanent: true,
      }));

    const axtraReDirection = [
      {
        source: '/blog/airport-transfers/booking-airport-transfers-during-the-busy-summer-season.html',
        destination: '/Blog',
        permanent: true,
      },
    ];

    return [
      ...aspUrls,
      ...htmlUrls,
      ...axtraReDirection,
    ];
  },
  images: {
    remotePatterns: [
      { hostname: 'api.london-tech.com' },
      { hostname: 'www.airport-pickups-london.com' },
      { hostname: 'api-backup.london-tech.com' },
    ],
    formats: ['image/webp'],
  },
  distDir: 'build',
  webpack(config) {
    // Sadece /heathrow-taxi-prices sayfasını analiz etmek için özel yapılandırma
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        default: false,
        common: false,
        heathrowTaxiPrices: {
          test: /pages\/\[linkname\]\.js/, // Dynamic route'u eşle
            name: 'heathrow-taxi-prices',
          chunks: 'all',
        },
      },
    };
    return config;
  },
});

module.exports = nextConfig;
