import env from "../resources/env";

const staticUrls = `
<url>
  <loc>https://aplairtest.netlify.app/</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/about-us</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/account-register</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/account-register-results</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/contact-us</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/drivers-wanted</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/fleet</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/heathrow-porter-service</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/heathrow-vip-meet-and-assist</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/meetgreet</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/parking-calculator</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/payment-details</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/quotation-results</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/reservations-document</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/terms</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/tour_customer_details</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/tour_payment_details</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/tours</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/transfer-details</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/travel-agents</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>
<url>
  <loc>https://aplairtest.netlify.app/track-my-taxi</loc>
  <lastmod>2024-08-29T00:00:00+00:00</lastmod>
</url>

`

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

async function fetchTaxiDealPaths(point) {
  const response = await fetch(`${env.apiDomain}/api/v1/taxi-deals/list?points=${point}`);
  const data = await response.json();
  return data.data.destinations.map(destination => destination.pathname);
}

async function fetchTourDealPaths() {
  const response = await fetch(`${env.apiDomain}/api/v1/tours-deals/list`);
  const data = await response.json();
  return data.data.map(tour => tour.pathname);
}

async function generateSiteMapWithPaths() {
  // Fetch paths from taxi deals API concurrently for all points
  const taxiPathsArray = await Promise.all(API_POINTS.map(fetchTaxiDealPaths));

  // Fetch paths from tours deals API
  const tourPathsArray = await fetchTourDealPaths();

  // Flatten the taxi paths array into a single array of paths
  const allTaxiPaths = taxiPathsArray.flat();

  // Combine all paths
  const allPaths = [...allTaxiPaths, ...tourPathsArray];

  // Generate dynamic URLs for the sitemap
  const dynamicUrls = allPaths.map(path => {
    return `
      <url>
          <loc>https://aplairtest.netlify.app${path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls}
    ${dynamicUrls}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  // Generate the XML sitemap with the API paths
  const sitemap = await generateSiteMapWithPaths();

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

function SiteMap() {
  // No need to render anything, the XML response is sent directly from getServerSideProps
}

export default SiteMap;
