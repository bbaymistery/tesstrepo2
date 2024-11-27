import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToSelectedList } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import NoResult from "./NoResult";
import styles from "./styles.module.scss";
const HandleSearchResults = ({
  pickOrDrop,
  journeyType,
  indexOfInputField,
  env
}) => {
  const { params, appData } = useSelector(selectPickUpDropOffReducer);
  const dispatch = useDispatch();
  const imgObj = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item.image,
    }),
    {}
  );
  const namePlaceOfObj = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item.categoryName,
    }),
    {}
  );

  const objectDetailss = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: JSON.parse(item.objectDetails),
    }),
    {}
  );

  const [newItems, setNewItems] = useState(null);
  const [noResult, setNoresult] = useState(false);
  const handleAddItemToSelectList = (item) => {
    //sending request to google placeis
    dispatch(addItemToSelectedList(item, pickOrDrop, journeyType, objectDetailss[item.pcatId], indexOfInputField));
    document.body.style.overflow = "unset";


  };

  useEffect(() => {
    if ((params.searchEngine[journeyType][pickOrDrop])) {
      let keyss = Object?.keys(params.searchEngine[journeyType][pickOrDrop]);
      const moveZeroosToTheEnd = (nums) => {
        let zeros = 0;
        for (let i = 0; i < nums.length; i++) {
          let isZero = nums[i] === "0";
          if (isZero) {
            zeros++;
            nums.splice(i, 1);
            i--;
          }
        }
        for (let i = 0; i < zeros; i++) {
          nums?.push("0");
        }
        return nums;
      };
      moveZeroosToTheEnd(keyss);
      keyss = moveZeroosToTheEnd(keyss);

      let newA = keyss?.map((key) => {
        return params?.searchEngine[journeyType][pickOrDrop][key];
      });

      if (newA[0] === true) setNoresult(true);

      setNewItems(newA);
    } else {
      setNoresult(true);
    }
  }, [params]);

  return (
    <div className={styles.search_results}>
      {noResult && <NoResult />}

      {newItems?.length && !noResult ? (
        <ul>
          {newItems?.length &&
            newItems?.map((arr) => {
              return arr?.map((item, i) => {
                return (
                  <div key={i}>
                    {/* //!this is for group name  */}
                    {i === 0 && (
                      <li key={i} className={i === 0 ? styles.groupName : ""}>
                        {item.pcatId === 10 ? (
                          <img src={`${env.apiDomain}/media/g-google.svg`} alt="g-google.svg" />
                        ) : (
                          imgObj && (<img src={`${env.apiDomain}${imgObj[item.pcatId]}`} alt="g-google.svg" style={{ transform: `${item.pcatId === 1 ? "rotate(-30deg)" : ""}`, }} />))}

                        <a href="/location/londiani-188981">
                          {namePlaceOfObj && namePlaceOfObj[item.pcatId]}
                        </a>
                        {item.pcatId === 10 && (<img src={`${env.apiDomain}/media/powered-by-google.png`} alt="powered-by-google" className={styles.googleImage} />)}
                      </li>
                    )}

                    {/* //!this is for the rest of subNames */}
                    <li onClick={() => handleAddItemToSelectList(item)}>
                      {imgObj && (
                        <img src={`${env.apiDomain}${imgObj[item.pcatId]}`} alt="powered-by" style={{ transform: `${item.pcatId === 1 ? "rotate(-30deg)" : ""}`, }} />)}
                      <p href="/location/londiani-188981">
                        {item.address}
                        {`   ${item?.postcode ? `-  ${item?.postcode}` : ""}`}
                      </p>
                    </li>
                  </div>
                );
              });
            })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default HandleSearchResults;
