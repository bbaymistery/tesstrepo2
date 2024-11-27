import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../components/elements/CardItem";
import InfoModal from "../../components/elements/InfoModal/InfoModal";
import LeftRightButton from "../../components/elements/LeftRightButtons";
import LinkBreadCumb from "../../components/elements/LinkBreadcumb";
import PickDropPointNames from "../../components/elements/PickDropPointNames";
import Layout from "../../components/layouts/Layout";
import {
  onewayDateTimeString,
  onewayDroopOffPointsOneWay,
  onewayPickUpPointsOneWay,
  returnDateTimeString,
  returnDropOffPointsReturn,
  returnPickUpPointsReturn,
  returnQuotOptions,
  selectedReturnQuot,
  selectedTransferQuot,
  transferQuotOptions,
} from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { SET_SELECT_ACTIVE_LINK } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import { modalInfo } from "../../store/showFieldReducer/showFieldSelectors";
import styles from "./styles.module.scss";
import { useConfirm } from '../../hooks/useConfirm'

const Quotation = (props) => {
  let { env } = props

  const dispatch = useDispatch();
  const [crumbs, setCrumbs] = useState([
    { linkName: "/", name: "home" },
    { linkName: "/quotation", name: "Airport Transfer Quotations" },
  ]);
  //general
  const selectModalInfo = useSelector(modalInfo);

  //oneWay
  const pickUpOneWay = useSelector(onewayPickUpPointsOneWay);
  const dropOffOneWay = useSelector(onewayDroopOffPointsOneWay);
  const dateOneWay = useSelector(onewayDateTimeString);
  const quotOptionsOneWay = useSelector(transferQuotOptions);
  const selectedQuotTransfer = useSelector(selectedTransferQuot);
  //return
  const returnPickUp = useSelector(returnPickUpPointsReturn);
  const returnDropOf = useSelector(returnDropOffPointsReturn);
  const returnDate = useSelector(returnDateTimeString);
  const rtQuotOptions = useSelector(returnQuotOptions);
  const selectedQuotReturn = useSelector(selectedReturnQuot);
  //in order having confirmation message
  const confirmationAlert = useConfirm({ previousUrl: "/", nextUrl: "/transfer-details", message: "If you refresh the page, all data will be deleted." })

  useEffect(() => {
    dispatch({
      type: SET_SELECT_ACTIVE_LINK,
      payload: "",
    });

    const container = document?.querySelector("#content");
    if (451 >= document?.documentElement?.clientWidth) {
      window.scroll({
        top: 541,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <>
      <Layout title="Quotation Results London Taxi">
        <div className={styles.quotation_page}>
          {selectModalInfo && (
            <InfoModal content="This is meant to give an approcimation of car size and category. Actual mane and model may vary" />
          )}

          <div className={styles.quotation_page_section}>
            <div
              id="content"
              className={`${styles.quotation_page_container} container`}
            >
              <LinkBreadCumb crumbs={crumbs} />
              <LeftRightButton
                title={"Airport Transfer Quotations"}
                linkToBack="/"
                linkToForward={"/transfer-details"}
                leftBtnTitle="Go Back"
                rightBtnTitle="Book Now"
              />

              {/*pick up drops names Like title  */}
              <PickDropPointNames
                pickUpPoints={pickUpOneWay}
                dropPoints={dropOffOneWay}
                title="Transfer Prices"
                date={dateOneWay}
              />

              <CardItem
                datas={quotOptionsOneWay}
                selectedQuotation={selectedQuotTransfer}
                journeyType={0}
                duration={quotOptionsOneWay.duration}
                env={env}
              />
              {/* quotation details for return details  */}
              {returnPickUp.length > 0 ? (
                ""
              ) : (
                <LeftRightButton
                  linkToBack="/"
                  linkToForward={"/transfer-details"}
                  leftBtnTitle="Go Back"
                  rightBtnTitle="Book Now"
                />
              )}
            </div>

            {returnPickUp.length > 0 ? (
              <div
                className={`${styles.quotation_page_container} ${styles.quotation_page_container_return}  container`}
              >
                {/*pick up drops names Like title  */}
                <PickDropPointNames
                  pickUpPoints={returnPickUp}
                  dropPoints={returnDropOf}
                  title="Return Prices"
                  date={returnDate}
                />

                <CardItem
                  datas={rtQuotOptions}
                  selectedQuotation={selectedQuotReturn}
                  journeyType={1}
                  duration={rtQuotOptions.duration}
                  env={env}
                />
                {/* quotation details for return details  */}

                <LeftRightButton
                  linkToBack="/"
                  linkToForward={"/transfer-details"}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Quotation;
export async function getServerSideProps({ req, res }) {
  if (req.url === "/quotation") {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: "",
    },
  };
}
