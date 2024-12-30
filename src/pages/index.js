import GlobalLayout from "../components/layouts/GlobalLayout";
import Hero from "../components/widgets/Hero";
import dynamic from 'next/dynamic'
const TaxiDeals = dynamic(() => import('../components/widgets/TaxiDeals'), { loading: () => <div>Loading...</div> });
const Testimonials = dynamic(() => import('../components/widgets/Testimonials'),);
const CarsSlider = dynamic(() => import('../components/widgets/CarsSlider'),);
const SeaportTransfers = dynamic(() => import('../components/widgets/SeaportTransfers'),);
import { parse } from 'url';
import Tours from "./tours";
import { fetchContent } from "../helpers/fetchContent";
import { checkLanguageAttributeOntheUrl } from "../helpers/checkLanguageAttributeOntheUrl";
import { useEffect, useState } from "react";
import { checkUnwantedQuery } from "../helpers/ifHasUnwantedCharacters";

const structuredSchema = {
  "@context": "http://schema.org/",
  "@type": "LocalBusiness",
  "name": "Airport Pickups London",
  "image": "https://www.airport-pickups-london.com/images/airport-pickups-london-logo.png",
  "@id": "6",
  "url": "https://www.airport-pickups-london.com//Heathrow/taxi-from-heathrow-to-brighton",
  "telephone": "+44 208 688 7744",
  "priceRange": "35",
  "address": {
    "@type": "PostalAddress",
    "postalCode": "UB7 9HJ",
    "streetAddress": "APL Office, Cherry Lane",
    "addressCountry": "GB",
    "addressLocality": "West Drayton"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.94",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "1772",
    "reviewCount": "1772"
  },
  "review": {
    "@type": "Review",
    "name": "Airport Pickups London",
    "reviewBody": "Driver was very professional  on time and good company ",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "datePublished": "2024-02-14",
    "author": {
      "@type": "Person",
      "name": "Mrs. Elizabeth Williams"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reviews.io"
    }
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.49759087451855,
    "longitude": -0.455451293899482
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/AirportPickupsLondon",
    "https://x.com/Airport_Pickups",
    "https://www.youtube.com/c/Airport-pickups-london"
  ]
  // Include other properties as needed
};
const breadcumbSchema = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "item": {
      "@id": "https://www.airport-pickups-london.com",
      "name": "Home"
    }
  }
  ]
}
const unwantedQueryRoutes = [
  { "?q=%7Bsearch_term_string%7D": "/" },
  { "?112": "/" },
  { "?pageId": "/" },
  { "?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A%20London-Airport-News%20(London%20Airport%20News)": "/News", },
  { "?lang=Tr": "/" },
];

export default function Home(props) {
  let { metaTitle, keywords, metaDescription, pageContent, mainCanonicalUrl } = props;
  const [hasScrolled, setHasScrolled] = useState(false);
  const handleScroll = () => {
    if (!hasScrolled) setHasScrolled(true);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <GlobalLayout mainCanonicalUrl={mainCanonicalUrl} keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true} >
      <Hero env={props.env} />
      <TaxiDeals env={props.env} />
      <SeaportTransfers bggray={true} />
      <Tours insideGlobalLayout={false} env={props.env} />
      {hasScrolled && <CarsSlider bggray={true} />}
      <Testimonials bggray={false} pageContent={pageContent} />
    </GlobalLayout>
  )
}
function cleanUrl(url) {
  const unwantedPart = "/_next/data/development/index.json";
  if (url.includes(unwantedPart)) {
    return url.replace(unwantedPart, '');
  }
  return url;
}
// Helper function to check for unwanted query strings

export async function getServerSideProps({ req, res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  let { pathname, query } = parse(req?.url, true);
  // Check for unwanted query strings
  const redirectTarget = checkUnwantedQuery(pathname, query, unwantedQueryRoutes);

  if (redirectTarget) {
    // Redirect to the desired path
    res.writeHead(301, { Location: redirectTarget });
    res.end();
    return { props: {} }; // No props needed since we are redirecting
  }


  let firstLoadLangauge = checkLanguageAttributeOntheUrl(req?.url);
  let pathnameUrlWHenChangeByTopbar = pathname
  const { cookie } = req.headers;
  let pathNameUrlCanonical = "/"
  let { metaTitle, keywords, pageContent, metaDescription, lang, canonicalUrl: mainCanonicalUrl } =
    await fetchContent("/", cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar, pathNameUrlCanonical)
  let schemas = [structuredSchema, breadcumbSchema];


  return { props: { metaTitle, keywords, pageContent, metaDescription, schemas, mainCanonicalUrl } }
}
