import { fetchConfig } from "../resources/getEnvConfig";

const STATIC_PATHS = [
  '/',
  '/about-us',
  '/account-register',
  '/account-register-results',
  '/contact-us',
  '/drivers-wanted',
  '/fleet',
  '/heathrow-porter-service',
  '/heathrow-vip-meet-and-assist',
  '/meetgreet',
  '/parking-calculator',
  '/payment-details',
  '/quotation-results',
  '/reservations-document',
  '/terms',
  '/tour_customer_details',
  '/tour_payment_details',
  '/tours',
  '/transfer-details',
  '/travel-agents',
  '/track-my-taxi',
];

const API_POINTS = [
  "heathrow",
  "gatwick",
  "city airport",
  'luton',
  'stansted',
  'portsmouth',
  'dover',
  'southampton'
];

const generateUrlXml = (domain, path, lastmod) => `<url><loc>${domain}${path}</loc><lastmod>${lastmod}</lastmod></url>`;


const fetchTaxiDealPaths = async (point, env) => {
  const response = await fetch(`${env.apiDomain}/api/v1/taxi-deals/list?points=${point}`);
  const { data } = await response.json();
  return data.destinations.map(destination => destination.pathname);
};

const fetchTourDealPaths = async (env) => {
  const response = await fetch(`${env.apiDomain}/api/v1/tours-deals/list`);
  const { data } = await response.json();
  return data.map(tour => tour.pathname);
};

const generateSiteMap = async (env) => {
  const lastmod = new Date().toISOString();

  // Generate static URLs
  const staticUrls = STATIC_PATHS.map(path => generateUrlXml(env.websiteDomain, path, lastmod)).join('\n');

  // Fetch dynamic paths concurrently
  const [taxiPaths, tourPaths] = await Promise.all([
    Promise.all(API_POINTS.map(point => fetchTaxiDealPaths(point, env))),
    fetchTourDealPaths(env)
  ]);

  // Generate dynamic URLs
  const dynamicUrls = [...taxiPaths.flat(), ...tourPaths].map(path => generateUrlXml(env.websiteDomain, path, lastmod)).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${dynamicUrls}
</urlset>`;
};

export async function getServerSideProps({ res }) {
  try {
    const env = await fetchConfig();
    const sitemap = await generateSiteMap(env);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
    return { props: {} };
  }
}

// Component remains empty as we handle everything in getServerSideProps
const SiteMap = () => null;

export default SiteMap;
