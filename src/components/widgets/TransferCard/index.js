import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToSelectedList } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
const TransferCard = (props) => {
  const { items } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { appData } = useSelector(selectPickUpDropOffReducer);
  const objectDetailss = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: JSON.parse(item.objectDetails),
    }),
    {}
  );

  const handleClickToGetQuotaion = (e, title) => {
    if (title === "Heathrow to Gatwick transfer") {
      let pickUp = {
        token:
          "9a619c5147a0cf4c5738fe72f5025fe16318f15b4c01af12d4dba1691d01c04ab56e2581be1b28b1d8f021dc7908988bc7d1d8f28c9982145576671571b9bada97aee5a6eb89d0ff3113cecfc8ed6db3227af533cee37d8cb44c87dfd23bf20abec72f86369a24391604a934fed7750c7db7dbfb655fb2b1d7946e25be6f594860841e5e5c4b7897d33172f3fb3a5402a5fdf18223e9de603a2fc69e0f8ee79d66a8028422ee465dc88c9239e9cbd8dc711bcd666c615cde26c44ba033ee0c2847e28c35f1a93178c940f8cab93cad21",
        pid: 4529,
        ptype: 2,
        address: "London Heathrow Airport, Terminal 2",
        postcode: "TW6 1EW",
        pcatId: 1,
      };
      let drop = {
        token:
          "a2bd9ef5d2fc41dc88adeda30c32d607a58ac25ef28f4f0412384db816db330192caf5d7cb48804191bce3b6ff814902e22c53bf5316ea5ebf85eb4ec42d3add1870507636a6b336f2b7a130bbf627ac26ffe7eaf1e694d03648f051e0324b9ee0510403402b0f8cc989e7a047644fadcf288077cfb3d805608244d38c3c51e0ba8f6d08fe4ee54386a53d328e957aece94fb8c4082d6fa344c42caf1e15784b9999cf6c191c487af982074557fdbd6b21ee1bfb419891b572442395416f22932e219a108e2d16b50841908356160f38",
        pid: 6627,
        ptype: 2,
        address: "Gatwick Airport, North Terminal",
        postcode: "RH6 0NP",
        pcatId: 1,
      };
      dispatch(
        addItemToSelectedList(
          pickUp,
          "pickupPoints",
          0,
          objectDetailss[pickUp.pcatId],
          0
        )
      );
      dispatch(
        addItemToSelectedList(
          drop,
          "dropoffPoints",
          0,
          objectDetailss[drop.pcatId],
          0
        )
      );

      router.push("/");
    } else {
      router.push("/");
    }
  };
  return (
    <ul className={styles.ul}>
      {items.map((item) => {
        return (
          <li
            id={item.id}
            className={styles.li}
            onClick={(e) => handleClickToGetQuotaion(e, item.title)}
            key={item.id}
          >
            <a className={styles.book_item}>
              <div className={styles.row}>
                <div className={`${styles.first_col} ${styles.col}`}>
                  <img src={item.img} alt={item.address} />
                </div>
                <div className={`${styles.second_col} ${styles.col}`}>
                  <div className={styles.booking_item_rating}>
                    <ul className={styles.icon_group}>
                      <li>
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li>
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li>
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li>
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li>
                        <i className="fa-solid fa-star-half-stroke"></i>
                      </li>
                    </ul>
                    <span className={styles.booking_item_rating_number}>
                      <b>4.8</b> of 5
                    </span>
                    <small>(984 customer reviews)</small>
                  </div>
                  <h3 className={styles.booking_item_title}>{item.title}</h3>
                  <p className={styles.booking_item_adress}>
                    <i className="fa-solid fa-plane"></i> {item.address}
                  </p>
                  <p className={styles.booking_item_description}>
                    {item.description}
                  </p>
                </div>
                <div className={`${styles.third_col} ${styles.col}`}>
                  <div className={styles.price_div}>
                    <span className={styles.price}>£{item.price}</span>
                    <span className={styles.text}>Starting from</span>
                  </div>
                  <span className="btn btn_primary">Get Quotation</span>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TransferCard;
