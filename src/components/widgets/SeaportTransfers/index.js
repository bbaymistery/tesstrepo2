import React from "react";
import styles from "./styles.module.scss";
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import { CruisePorts } from "../../../constants/navigatior";
const index = (props) => {
  let { bggray = false, } = props
  const dispatch = useDispatch()
  const { appData } = useSelector(state => state.initialReducer)
  const { params: { language } } = useSelector(state => state.pickUpDropOffActions)

  return (
    <div className={`${styles.seaport} page`} bggray={String(bggray)} style={{ backgroundColor: `${String(bggray) === "true" ? "#f5f5f5" : "white"}` }}>
      <div className={`${styles.seaport_section} page_section`}>
        <div className={`${styles.seaport_section_container} page_section_container`}>
          <h1 className={`${styles.transfer_title} seaportTtile`}>{appData?.words["strCruisePortTaxiTransfers"]}</h1>
          <div className={styles.container}>
            <div className={styles.content} >
              {CruisePorts.map((item, _) => {
                let { hasTaxiDeals } = item
                return (
                  <a onClick={() => { dispatch({ type: "SET_NAVBAR_TAXI_DEALS", data: { hasTaxiDeals } }) }}
                    key={item.id} href={`${language === 'en' ? `${item.path}` : `/${language}${item.path}`}`} style={{ display: "block", width: '100%', }} className="seaportt">
                    <div className={styles.card}>
                      <div className={styles.img_div}>
                        <Image src={item.imgUrl} className={styles.img_original} alt={item.translateTitle} fill sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                      <div className={styles.card_desc}>
                        <h2 className={styles.card_desc_title}>{appData?.words[item.translateTitle]}</h2>
                        <div className={styles.card_desc_subtitle}>
                          <div className={styles.card_detail_btn_box}>
                            <div className={styles.detail_btn}>{appData?.words["strReadMore"]}</div>
                            <p className={styles.detail_arrow_icon}>
                              <i className="fa-solid fa-angle-right"></i>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default index;
