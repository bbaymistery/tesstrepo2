import React from "react";
import { useSelector } from "react-redux";
import {
  onewayDateTimeString,
  onewayDroopOffPointsOneWay,
  onewayPickUpPointsOneWay,
  returnDateTimeString,
  returnDropOffPointsReturn,
  returnPickUpPointsReturn,
  selectedReturnQuot,
  selectedTransferQuot,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import PaymentWhatIsFree from "../../widgets/PaymentWhatIsFree";
import TransferCarCard from "../TranferCarCard";
import TransferSummarizeCard from "../TransferSummarizeCard";
import styles from "./styles.module.scss";
const JourneySummary = (props) => {
  const {
    title,
    journeyType,
    showPrice,
    flexRow = false,
    showPriceIncluded = false,
    mb_0 = false,
    no_boxshadow = false,
    py_1 = false,
    paymentPage = false,
    env
  } = props;
  const { appData, params } = useSelector(selectPickUpDropOffReducer);
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );
  const selectedPickUpsOneWay = useSelector(onewayPickUpPointsOneWay);
  const selectedDropOffOneWay = useSelector(onewayDroopOffPointsOneWay);
  const selectTransferDate = useSelector(onewayDateTimeString);
  const transferQuotation = useSelector(selectedTransferQuot);
  /*
   */
  const returnQiotation = useSelector(selectedReturnQuot);
  const returnDate = useSelector(returnDateTimeString);
  const returnPickPoints = useSelector(returnPickUpPointsReturn);
  const returnDropPoints = useSelector(returnDropOffPointsReturn);

  return (
    <div
      className={`
       ${styles.left}
       ${flexRow ? styles.flexRow : ""}
       ${mb_0 ? "mb_0" : ""}
       ${no_boxshadow ? "box_shadow_none" : ""}
       ${py_1 ? "py_1" : ""}
       ${paymentPage ? styles.paymentPage : ""}
      `}
    >
      <div className={styles.left_booking_title}>{title}</div>
      <div className={`${styles.cards_div} `}>
        {carObject && (
          <TransferCarCard
            carObject={carObject}
            quotation={journeyType === 0 ? transferQuotation : returnQiotation}
            paymentPage={paymentPage}
            env={env}
          />
        )}
        {carObject && !showPriceIncluded && (
          <TransferSummarizeCard
            showPrice={showPrice}
            date={journeyType === 0 ? selectTransferDate : returnDate}
            pickPoints={
              journeyType === 0 ? selectedPickUpsOneWay : returnPickPoints
            }
            dropPoints={
              journeyType === 0 ? selectedDropOffOneWay : returnDropPoints
            }
            journeyType={params.journeyType}
            totalPrice={
              params.journeyType === 1
                ? Number(transferQuotation.price) +
                  Number(returnQiotation.price)
                : Number(transferQuotation.price)
            }
          />
        )}

        {showPriceIncluded && (
          <PaymentWhatIsFree
            twoColumns={false}
            oneColumn={true}
            noTitle={true}
          />
        )}
      </div>
    </div>
  );
};

export default JourneySummary;
