import React, { useState } from 'react';
import styles from "./styles.module.scss";
import GlobalLayout from '../../components/layouts/GlobalLayout';
import { useSelector } from 'react-redux';
import { titleStringOfHastaxiDeals } from '../../helpers/titleStringOfHasTaxiDeals';
import env from '../../resources/env';
const INITIAL_DISPLAY_COUNT = 12;
const keywords = "Sitemap";
const metaTitle = "Airport Pickup London Sitemap";
const metaDescription = "You can find your destination url from our Sitemap-Airport-pickups-london.com.";
const API_POINTS = ["heathrow", "gatwick", "city airport", 'luton', 'stansted', 'portsmouth', 'dover', 'southampton'];
const mainPages = [
    { href1: '/about-us', title1: 'About-Us', href2: '/tours', title2: 'Tours' },
    { href1: '/contact-us', title1: 'Contact-us', href2: '/fleet', title2: 'Our Fleet' },
    { href1: '/travel-agents', title1: 'Travel Agents', href2: '/drivers-wanted', title2: 'Drivers-wanted' },
    { href1: '/account-register', title1: 'Account-register', href2: '/heathrow-porter-service', title2: 'Heathrow Porter Service' },
    { href1: '/parking-calculator', title1: 'Parking Calculator', href2: '/heathrow-vip-meet-and-assist', title2: 'Heathrow Vip Meet-And-Assist' },
];

// Single row component
const TableRow = ({ pathname, pageTitle, price }) => (
    <tr>
        <td>
            <a href={pathname}>
                {pageTitle}
            </a>
            <span>{price}</span>
        </td>
        <td>
            <a href={pathname}>
                {pageTitle}
            </a>
            <span>{price}</span>
        </td>
    </tr>
);

// Table component handling a long list and show more
const Table = ({ title, rows, showMore, toggleShowMore }) => (
    <table className={styles.sitemap} id="sitemap">
        <thead>
            <tr>
                <th style={{ textAlign: "center" }} colSpan="2">{title}</th>
            </tr>
        </thead>
        <tbody>
            {rows.map((data, index) => (
                <TableRow key={index} pathname={data.pathname} pageTitle={data.pageTitle} price={data.price} />
            ))}
            {/* Show More / Show Less button */}
            {rows.length > INITIAL_DISPLAY_COUNT && (
                <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                        <button onClick={toggleShowMore}>
                            {showMore ? 'Show Less' : 'Show More'}
                        </button>
                    </td>
                </tr>
            )}
        </tbody>
    </table>
);

const Sitemap = ({ tourDatas, taxiData }) => {
    const { appData } = useSelector(state => state.initialReducer);
    const [showMoreState, setShowMoreState] = useState({});

    const toggleShowMore = (point) => {
        setShowMoreState((prevState) => ({ ...prevState, [point]: !prevState[point] }));
    };

    return (
        <GlobalLayout keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true}>
            <div className={`${styles.sitemap} page`}>
                <div className={`${styles.sitemap_section} page_section`}>
                    <div className={`${styles.sitemap_section_container} page_section_container`}>

                        {/* Main Pages Table */}
                        <Table
                            title="Main Pages"
                            rows={mainPages.map((page, index) => ({
                                pageTitle: page.title1,
                                pathname: page.href1,
                                price: "",
                            })).concat(mainPages.map((page) => ({
                                pageTitle: page.title2,
                                pathname: page.href2,
                                price: "",
                            })))}
                        />

                        {/* Tours Deals Taxi Prices Table */}
                        <Table
                            title="Tours Deals Taxi Prices"
                            rows={tourDatas.slice(0, showMoreState["tours"] ? tourDatas.length : INITIAL_DISPLAY_COUNT)}
                            showMore={showMoreState["tours"]}
                            toggleShowMore={() => toggleShowMore("tours")}
                        />

                        {/* Taxi Deals Tables */}
                        {API_POINTS.map((point) => (
                            <Table
                                key={point}
                                title={appData?.words[`${titleStringOfHastaxiDeals(point)}`]}
                                rows={taxiData[point].slice(0, showMoreState[point] ? taxiData[point].length : INITIAL_DISPLAY_COUNT)}
                                showMore={showMoreState[point]}
                                toggleShowMore={() => toggleShowMore(point)}
                            />
                        ))}

                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </GlobalLayout>
    );
};

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
