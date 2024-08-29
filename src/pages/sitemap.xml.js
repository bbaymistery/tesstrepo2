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
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';
//taxideals 
//tours
//singletours 

function generateSiteMap(posts) {
    // Dynamic URLs
    const dynamicUrls = posts.map(({ id }) => {
        return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `;
    }).join('');
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}
      ${dynamicUrls}
    </urlset>
    `;
}

function SiteMap() {


}
export default SiteMap

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const request = await fetch(EXTERNAL_DATA_URL);
    const posts = await request.json();

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}