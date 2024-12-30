import React from "react";
import { useSelector } from "react-redux";
import { features } from "../../../constants/features";
import styles from "./styles.module.scss";
const Features = (props) => {
  let { bggray } = props
  const state = useSelector(state => state.pickUpDropOffActions)
  let { params: { direction } } = state
  const { appData } = useSelector(state => state.initialReducer)
  return (
    <div className={`${styles.mainbox}  ${direction} page`} bggray={String(bggray)}>
      <div className={`${styles.mainbox_section} page_section`}>
        <div className={`${styles.mainbox_section_container} page_section_container`}>
          <div className={styles.features}>
            <div className={`container ${styles.feature_container}`}>
              <div className={styles.cards}>
                {(features || []).map((card, index) => {
                  return (
                    <div key={index} className={styles.card}>
                      <h3 className={styles.card_title}  ><span>{card.fontAwesome}</span>{(appData || {})?.words[card.translateTitle]}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
