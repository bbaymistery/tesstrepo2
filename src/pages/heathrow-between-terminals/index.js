import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LinkBreadCumb from "../../components/elements/LinkBreadcumb";
import Layout from "../../components/layouts/Layout";
import { SET_SELECT_ACTIVE_LINK } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import TextContent from "./TextContent";
import styles from "./styles.module.scss";
import TransferCard from "../../components/widgets/TransferCard";
import { betwenItems } from "../../constants/heathrowBetweenTerminals";
const HeathrowBetweenTerminals = () => {
  const [crumbs, setCrumbs] = useState([
    { linkName: "/", name: "home" },
    { linkName: "/heathrow-between-terminals", name: "heathrow taxi deals" },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_SELECT_ACTIVE_LINK,
      payload: "heathrow between terminals",
    });
  }, []);
  //selectActiveLinkName
  return (
    <Layout title="APL">
      <div className={`page ${styles.between_page}`}>
        <div className={`page_section ${styles.between_page_section}`}>
          <div
            className={`page_section_container ${styles.between_page_section_container}`}
          >
            <LinkBreadCumb crumbs={crumbs} />
            <h1 className={styles.title}>Heathrow Between Terminals</h1>
            <TransferCard items={betwenItems} />
            <TextContent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HeathrowBetweenTerminals;
