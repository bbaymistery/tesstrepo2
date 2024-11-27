import React from "react";
import { ifHasUnwantedCharacters } from "../../../helpers/ifHasUnwantedCharacters";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
const CheckPlaceOfInterest = (props) => {
  let { point, onChange = () => { }, errorMessage } = props
  const onchangeHandler = (e) => {
    let { value } = e.target
    if (ifHasUnwantedCharacters(value)) return
    onChange(value)
  };
  const { appData } = useSelector(state => state.initialReducer)

  return (
    <>
      {point.pcatId === 7 ?
        (<div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {/* check language_words */}
            <TextInput label={appData?.words["strPlacesofInterest"]} type="text" name="address-description" onChange={(e) => onchangeHandler(e)} value={point["address-description"]} errorMessage={errorMessage} />
          </div>
        </div>)
        : <React.Fragment></React.Fragment>}
    </>
  );
};

export default CheckPlaceOfInterest;
//Lexington House, 35 Park Lodge Avenue, West Drayton, UK