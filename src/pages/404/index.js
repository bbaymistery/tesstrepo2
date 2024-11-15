import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import style from "./styles.module.scss";

const CustomError = () => {
  const router = useRouter();

  // Define an array of paths to set as "noindex, nofollow"
  const noIndexPaths = ["/api/v1/payment/elavon/create", "/api/v1/payment/paypal/create", "/api/v1/payment/stripe/create",];

  // Update meta tag conditionally
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="robots"]');

    // Check if the current path is in the noIndexPaths array
    if (noIndexPaths.includes(router.asPath)) {
      if (metaTag) {
        metaTag.setAttribute("content", "noindex, nofollow");
      } else {
        const newMetaTag = document.createElement("meta");
        newMetaTag.setAttribute("name", "robots");
        newMetaTag.setAttribute("content", "noindex, nofollow");
        document.head.appendChild(newMetaTag);
      }
    } else {
      // Reset to default (index, follow) if the path doesn't match
      if (metaTag) {
        metaTag.setAttribute("content", "index, follow");
      }
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        {/* Default meta tag */}
        <meta name="robots" content="index, follow" />
      </Head>
      <div className={style.main_box}>
        <div className={style.container}>
          <h2>Oops! Page not found.</h2>
          <h1>404</h1>
          <p>We can't find the page you're looking for.</p>
          <a href="/">Go back home</a>
        </div>
      </div>
    </>
  );
};

export default CustomError;
