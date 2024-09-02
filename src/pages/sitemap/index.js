import React, { useState } from 'react';
import styles from "./styles.module.scss";
import GlobalLayout from '../../components/layouts/GlobalLayout';
import { useSelector } from 'react-redux';
import { titleStringOfHastaxiDeals } from '../../helpers/titleStringOfHasTaxiDeals';
import env from '../../resources/env';

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

let keywords = "Sitemap";
let metaTitle = "Airport Pickup London Sitemap";
let metaDescription = "You can find your destination url from our Sitemap-Airport-pickups-london.com.";

const Sitemap = ({ tourDatas, taxiData }) => {
    const { appData } = useSelector(state => state.initialReducer);
    const [showMore, setShowMore] = useState({});

    const toggleShowMore = (point) => {
        // Toggle the showMore state for the specific point
        setShowMore(prevState => ({ ...prevState, [point]: !prevState[point] }));
    };

    return (
        <GlobalLayout keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true}>
            <div className={`${styles.sitemap} page`}>
                <div className={`${styles.sitemap_section} page_section`}>
                    <div className={`${styles.sitemap_section_container} page_section_container`}>
                        <table className={styles.sitemap} id="sitemap">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }} colSpan="2">Tours Deals Taxi Prices</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tourDatas.map((data, index) => (
                                    <tr key={index}>
                                        <td>
                                            <a href={data.pathname}>
                                                {data.pageTitle}
                                            </a>
                                            <span>{data.price}</span>
                                        </td>
                                        <td>
                                            <a href={data.pathname}>
                                                {data.pageTitle}
                                            </a>
                                            <span>{data.price}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {API_POINTS.map((point) => (
                            <table key={point} className={styles.sitemap} id="sitemap">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center" }} colSpan="2">{appData?.words[`${titleStringOfHastaxiDeals(point)}`]}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taxiData[point] && taxiData[point].slice(0, showMore[point] ? taxiData[point].length : 14).map((data, index) => (
                                        <tr key={index}>
                                            <td>
                                                <a href={data.pathname}>
                                                    {data.translatedPageTitle}
                                                </a>
                                                <span>{data.price}</span>
                                            </td>
                                            <td>
                                                <a href={data.pathname}>
                                                    {data.translatedPageTitle}
                                                </a>
                                                <span>{data.price}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {taxiData[point] && taxiData[point].length > 14 && (
                                        <tr>
                                            <td colSpan="2" style={{ textAlign: 'center', justifyContent: "center", alignItems: 'center' }}>
                                                <button onClick={() => toggleShowMore(point)}>
                                                    {showMore[point] ? 'Show Less' : 'Show More'}
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ))}
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </GlobalLayout>
    );
}

export default Sitemap;

export async function getServerSideProps() {
    // Fetch tour deals data
    async function fetchTourDealPaths() {
        const response = await fetch(`${env.apiDomain}/api/v1/tours-deals/list`);
        const data = await response.json();
        return data.data;
    }

    // Fetch taxi deals data for each point
    async function fetchTaxiDealPaths(point) {
        const response = await fetch(`${env.apiDomain}/api/v1/taxi-deals/list?points=${point}`);
        const data = await response.json();
        return data.data.destinations;
    }

    // Fetch data on the server side
    const tourDatas = await fetchTourDealPaths();
    const taxiData = {};

    for (const point of API_POINTS) {
        taxiData[point] = await fetchTaxiDealPaths(point);
    }

    // Pass the fetched data to the client-side component
    return {
        props: {
            tourDatas,
            taxiData
        }
    };
}
