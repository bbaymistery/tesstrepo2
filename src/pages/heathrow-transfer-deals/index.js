import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LinkBreadCumb from "../../components/elements/LinkBreadcumb";
import Layout from "../../components/layouts/Layout";
import TransferCard from "../../components/widgets/TransferCard";
import { dealsItems } from "../../constants/heathrowTransferDeals";
import { SET_SELECT_ACTIVE_LINK } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import styles from "./styles.module.scss";
import TextContent from "./TextContent";
const HeathrowTaxiDeals = () => {
  const [crumbs, setCrumbs] = useState([
    { linkName: "/", name: "home" },
    { linkName: "/heathrow-transfer-deals", name: "heathrow transfer deals" },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_SELECT_ACTIVE_LINK,
      payload: "heathrow transfer deals",
    });
  }, []);
  return (
    <Layout title="APL">
      <div className={`page ${styles.deals_page}`}>
        <div className={`page_section ${styles.deals_page_section}`}>
          <div
            className={`page_section_container ${styles.deals_page_section_container}`}
          >
            <LinkBreadCumb crumbs={crumbs} />
            <h1 className={styles.title}>Heathrow Transfer Deals</h1>

            <TransferCard items={dealsItems} />
            <TextContent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HeathrowTaxiDeals;
