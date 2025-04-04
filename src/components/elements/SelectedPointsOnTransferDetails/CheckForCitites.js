import React from "react";
import { ifHasUnwantedCharacters } from "../../../helpers/ifHasUnwantedCharacters";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForCitites = (props) => {
  let { point, onChange = () => { }, errorMessage } = props

  const onchangeHandler = (e) => {
    let { value } = e.target
    if (ifHasUnwantedCharacters(value)) return
    onChange(value)
  };

  return (
    <>
      {point.pcatId === 8 ?
        (<div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {/* check language_words */}
            <TextInput label="Cities" type="text" name="address-description" onChange={(e) => onchangeHandler(e)} value={point["address-description"]} errorMessage={errorMessage} />
          </div>
        </div>)
        : <React.Fragment></React.Fragment>}

    </>
  );
};

export default CheckForCitites;
