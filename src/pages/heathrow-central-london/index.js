import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LinkBreadCumb from "../../components/elements/LinkBreadcumb";
import Layout from "../../components/layouts/Layout";
import TransferCard from "../../components/widgets/TransferCard";
import { centralItems } from "../../constants/heaythrowCentralLondon";
import { SET_SELECT_ACTIVE_LINK } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import styles from "./styles.module.scss";
import TextContent from "./TextContent";
const HeathrowCentralLondon = () => {
  const [crumbs, setCrumbs] = useState([
    { linkName: "/", name: "home" },
    { linkName: "/heathrow-central-london", name: "heathrow central london" },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_SELECT_ACTIVE_LINK,
      payload: "heathrow central london",
    });
  }, []);
  //selectActiveLinkName
  return (
    <Layout
      title="Heathrow taxi  to Central  London – London to Heathrow taxi"
      keywords="Heathrow taxi,Heathrow shuttle,Heathrow transport"
      description="Reliable taxi service from to Heathrow airport"
    >
      <div className={`page ${styles.central_page}`}>
        <div className={`page_section ${styles.central_page_section}`}>
          <div
            className={`page_section_container ${styles.central_page_section_container}`}
          >
            <LinkBreadCumb crumbs={crumbs} />
            <h1 className={styles.title}>
              Heathrow to Central London Transfer
            </h1>
            <TransferCard items={centralItems} />
            <TextContent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HeathrowCentralLondon;
