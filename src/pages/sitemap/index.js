import React, { useState } from 'react';
import styles from "./styles.module.scss";
import GlobalLayout from '../../components/layouts/GlobalLayout';
import { useSelector } from 'react-redux';
import { titleStringOfHastaxiDeals } from '../../helpers/titleStringOfHasTaxiDeals';
import { fetchConfig } from '../../resources/getEnvConfig';

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


const Table = ({ title, rows }) => (
    <table className={styles.sitemap} id="sitemap">
        <thead>
            <tr>
                <th style={{ textAlign: "center" }} colSpan="2">{title}</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
);


const TableRow = ({ leftData, rightData }) => (
    <tr>
        <td>
            {leftData && (
                <>
                    <a href={leftData.pathname}>{leftData.pageTitle}</a>
                    <span>{leftData.price}</span>
                </>
            )}
        </td>
        <td>
            {rightData && (
                <>
                    <a href={rightData.pathname}>{rightData.pageTitle}</a>
                    <span>{rightData.price}</span>
                </>
            )}
        </td>
    </tr>
);



const Sitemap = (props) => {
    let { tourDatas, taxiData} = props

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

                        {/* Main Pages Table */}
                        <Table
                            title="Main Pages"
                            rows={mainPages.map((page, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={page.href1}>{page.title1}</a>
                                    </td>
                                    <td>
                                        <a href={page.href2}>{page.title2}</a>
                                    </td>
                                </tr>
                            ))}
                        />


                        <Table
                            title="Tours Deals Taxi Prices"
                            rows={tourDatas.reduce((acc, data, index) => {
                                if (index % 2 === 0) {
                                    // If index is even, create a new row with left data
                                    acc.push(
                                        <TableRow
                                            key={index}
                                            leftData={tourDatas[index]}
                                            rightData={tourDatas[index + 1] || null} // Right data is the next item if it exists
                                        />
                                    );
                                }
                                return acc;
                            }, [])}
                        />

                        {API_POINTS.map((point) => (
                            <Table
                                key={point}
                                title={appData?.words[`${titleStringOfHastaxiDeals(point)}`]}
                                rows={
                                    <>
                                        {taxiData[point] && taxiData[point]
                                            .slice(0, showMore[point] ? taxiData[point].length : INITIAL_DISPLAY_COUNT)
                                            .reduce((acc, data, index) => {
                                                if (index % 2 === 0) {
                                                    acc.push(
                                                        <TableRow
                                                            key={index}
                                                            leftData={taxiData[point][index]}
                                                            rightData={taxiData[point][index + 1] || null} // Right data is the next item if it exists
                                                        />
                                                    );
                                                }
                                                return acc;
                                            }, [])
                                        }

                                        {taxiData[point] && taxiData[point].length > INITIAL_DISPLAY_COUNT && (
                                            <tr>
                                                <td colSpan="2" style={{ textAlign: 'center', justifyContent: "center" }}>
                                                    <button onClick={() => toggleShowMore(point)}>
                                                        {showMore[point] ? 'Show Less' : 'Show More'}
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                }
                            />
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
  const env = await fetchConfig();

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
