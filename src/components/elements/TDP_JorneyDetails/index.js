import React from "react";
import styles from "./styles.module.scss";
import SelectedLists from "../SelectedList";
// dropHandlings,  pickupHandlings,  =>comes from transfer detals page

const TransferJourneyDetails = (props) => {
  const {
    pickUps,
    drops,
    journeyTitle,
    journeyType,
    marginTop,
    pickupHandlings,
    dropHandlings,
    env
  } = props;

  return (
    <div className={`${styles.journey_details} ${marginTop ? "mt_2" : ""}`}>
      <div className={styles.journey_details_title}>
        <h3>{journeyTitle}</h3>
      </div>
      {/* //! selected items */}
      <div className={styles.selecteditems}>
        <div className={styles.points}>
          {pickUps?.length > 0 && (
            <SelectedLists
              selectedItems={pickUps}
              index={0}
              journeyType={journeyType}
              titleFromTo="From"
              handleInputs={pickupHandlings}
              env={env}

            />
          )}
        </div>

        <div className={styles.points}>
          {drops?.length > 0 && (
            <SelectedLists
              selectedItems={drops}
              index={1}
              journeyType={journeyType}
              titleFromTo="To"
              handleInputs={dropHandlings}
              env={env}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferJourneyDetails;
