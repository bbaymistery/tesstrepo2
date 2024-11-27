import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LinkBreadCumb from "../../components/elements/LinkBreadcumb";
import Layout from "../../components/layouts/Layout";
import { SET_SELECT_ACTIVE_LINK } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import TransferCard from "../../components/widgets/TransferCard";

import TextContent from "./TextContent";
import styles from "./styles.module.scss";
import { hotelTrItems } from "../../constants/HeathrowHotelTransfer";
const HeathrowHotelsTaxi = () => {
  const [crumbs, setCrumbs] = useState([
    { linkName: "/", name: "home" },
    { linkName: "/heathrow-hotel-taxi", name: "Heathrow Taxi Deals" },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_SELECT_ACTIVE_LINK,
      payload: "heathrow hotel taxi",
    });
  }, []);
  //selectActiveLinkName
  return (
    <Layout title="APL">
      <div className={`page ${styles.hotelTaxi_page}`}>
        <div className={`page_section ${styles.hotelTaxi_page_section}`}>
          <div
            className={`page_section_container ${styles.hotelTaxi_page_section_container}`}
          >
            <LinkBreadCumb crumbs={crumbs} />
            <h1 className={styles.title}>Heathrow Between Terminals</h1>
            <TransferCard items={hotelTrItems} />
            <TextContent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HeathrowHotelsTaxi;
