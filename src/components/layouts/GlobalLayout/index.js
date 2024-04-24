import React from 'react'
import Head from 'next/head';
import TopHeader from '../../widgets/TopHeader';
import Footer from '../../widgets/Footer';
import { useRouter } from 'next/router';
import { seoDefaults } from '../../../constants/seoDefaults';

const GlobalLayout = ({ children, title = seoDefaults.title, description = seoDefaults.description, keywords = seoDefaults.keywords, footerbggray = seoDefaults.footerbggray, isVisible = seoDefaults.isVisible,  }) => {
  const router = useRouter()
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 " />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

        {/*//?Directly copied from aplcars.com */}
        <meta name="verify-v1" content="KKDrUvNuL/YKcQ6PqTYbnH+UUOq0/lz/pJU/z7M+Ro4=" />
        <meta name="baidu-site-verification" content="x5apENcEmp" />
        <meta name="distribution" content="Global" />
        <meta name="copyright" content={`Copyright Airport-pickups-london.com ${currentYear}. All rights reserved.`} />
        <meta name="resource-type" content="document" />
        <meta name="author" content="Airport-pickups-london.com" />
        <meta name="language" content="en" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="google-site-verification" content="_Cn8CYgXUWiRe05oCJj_l5OkyXza4K4nIuDWUPs8P2w" />
        <meta name="msvalidate.01" content="41FC097AFD6E06774C838AC3D486664F" />
        <meta httpEquiv="X-UA-Compatible" content="IE=9" />
        <meta httpEquiv="x-ua-compatible" content="IE=EmulateIE9" />
        {/* <meta name="twitter:site" content="@Airport_Pickups" /> */}
        {/* <meta property="twitter:account_id" content="2194542811" /> */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        {/* <meta name="twitter:site" content="@Airport_Pickups" /> */}
        {/* <meta name="twitter:title" content="Airport Pickups London" /> */}
        {/* <meta name="twitter:description" content="APL offers cheap airport travel and cruise port transfers and shuttle service to London. We cover Heathrow, Gatwick, Stansted, Luton and City Airports" /> */}
        {/* <meta name="twitter:image" content="https://www.airport-pickups-london.com/images/apl-tw-logo.png" /> */}
        {/* <meta property="og:title" content="London Airport Transfers to Airport-Car Service-Minicab" /> */}
        {/* <meta property="og:description" content="APL offers cheap airport travel and cruise port transfers and shuttle service to London. We cover Heathrow, Gatwick, Stansted, Luton and City Airports" /> */}
        {/* <meta property="og:type" content="website" /> */}
        {/* <meta property="og:url" content="https://www.airport-pickups-london.com/" /> */}
        {/* <meta property="og:site_name" content="Airport Pickups London" /> */}

      
        {/*//? no follow  */}
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex" />
        {/* <meta name="googlebot" content="index" /> */}
        {/* <meta name="robots" content="index,follow" /> */}
        {router.pathname === "/" ? <link rel="preload" href="/images/others/TripAdvisor2.webp" as="image" /> : <></>}
        {/* //for home page and /heathrow/heathrow-to-oxford-taxi we dont show all fontawesome csss */}
        {(router.pathname === "/") || (router.pathname === '/[...pathname]') ? <link rel="stylesheet" href="/fontawesome/css/all.min.css" /> : <link rel="stylesheet" href="/fontawesomeHomePage/css/all.min.css" />}
      </Head>
      <TopHeader />
      <main>
        {children}
      </main>
      {((isVisible && router.pathname === '/[...pathname]') || (router.pathname !== '/[...pathname]')) && (<Footer bggray={footerbggray} />)}
    </>
  )
}

export default GlobalLayout
