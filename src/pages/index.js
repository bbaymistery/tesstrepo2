import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.scss";
import Layout from "../components/layouts/Layout";
import Hero from "../components/elements/Hero";
import UiView from "../components/widgets/UiView";
import HappyCustomer from "../components/widgets/HappyCustomer";
import TopDestination from "../components/widgets/TopDestination"

export default function HomePage(props) {

  let { env } = props

  return (
    <Layout>
      <div className={styles.homecontainer}>
        <Hero env={env} isHeroContentActive={true} isBgImageActive={true} />
        <UiView />
        <HappyCustomer />
        <TopDestination />
      </div>
    </Layout>
  );
}



export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}