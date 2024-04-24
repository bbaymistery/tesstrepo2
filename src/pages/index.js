
import { checkLanguageAttributeOntheUrl } from "../helpers/checkLanguageAttributeOntheUrl";
import env from "../resources/env";
import dynamic from 'next/dynamic'
import { parse } from 'url';

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
    "https://twitter.com/Airport_Pickups",
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
      "@id": "https://www.airport-pickups-london.com/",
      "name": "Home"
    }
  }
  ]
}

let a = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "item": { "@id": "https://www.airport-pickups-london.com/", "name": "Home" }
  },
  {
    "@type": "ListItem",
    "position": 2,
    "item": { "@id": "https://www.airport-pickups-london.com/Terms.asp", "name": " Booking Terms and Conditions" }
  }]
}
export default function Home() {
  return (<div>salam</div>)
}
export async function getServerSideProps({ req, res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  let firstLoadLangauge = checkLanguageAttributeOntheUrl(req?.url)
  let { pathname } = parse(req?.url, true)
  let pathnameUrlWHenChangeByTopbar = pathname
  const { cookie } = req.headers;
  let { metaTitle, keywords, pageContent, metaDescription, lang } = await fetchContent("/", cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar)
  let schemas = [structuredSchema, breadcumbSchema];
  let mainCanonical = lang === 'en' ? `${env.websiteDomain}${pathname}` : `${env.websiteDomain}/${lang}${pathname}`

  return {
    props: { metaTitle, keywords, pageContent, metaDescription, schemas, mainCanonical },
  }
}