import React from "react";
import { useSelector } from "react-redux";
import { ifHasUnwantedCharacters } from "../../../helpers/ifHasUnwantedCharacters";
import Select from "../Select";
import Textarea from "../Textarea";

import styles from "./styles.module.scss";
const CheckingForPostcodes = (props) => {
  let { point, onChange = () => { }, error, isTaxiDeal = false } = props
  let state = useSelector((state) => state.pickUpDropOffActions)
  const { appData } = useSelector(state => state.initialReducer)

  let { params: { postCodeAdresses } } = state
  let postCodes = (postCodeAdresses.filter(pCode => point.postcode === pCode.postcode && pCode.addresses)[0] || {}).addresses || []

  const onchangeHandler = (e, params = {}) => {
    let { value, name } = e.target
    if (ifHasUnwantedCharacters(value)) return

    let extraState = {};
    if (name === 'id') extraState['postCodeAddress'] = ((Array.isArray(postCodes) ? postCodes : [])?.find(obj => obj.id === parseInt(value)) || {}).value || '';

    let newPostcodeDetails = { ...point.postCodeDetails, [name]: name === 'id' ? parseInt(value) : value, ...extraState }
    onChange(newPostcodeDetails)
  };


  return (
    <>
      {/* //!checking for postcode pickups transfer */}
      {point.pcatId === 5 ?
        (<div className={styles.insideInputs}>
          <div className={`${styles.insideInputs_input} ${isTaxiDeal ? styles.inside_inputs_istaxideal : ""}`}>
            <Select
              name="id"
              opt={true}
              label={appData?.words["strPostCodeAddress"]}
              value={point.postCodeDetails.id}
              onChange={(e) => onchangeHandler(e)}
              postCodeSelectOption={true}
              errorMessage={point.postCodeDetails.id !== 0 && (error?.postCodeDetails?.postCodeAddress || error?.postCodeDetails?.id) ? "required" : ""}
              data={[{ id: "", value: `--${appData?.words["quSelectButton"]}--` }, { id: 0, value: `${appData?.words["strAddNewAddressIfNotListed"]}` }, ...postCodes?.length > 0 ? postCodes : []]}
            />
            {point.postCodeDetails.id === 0 ?
              <Textarea name="postCodeAddress" label={appData?.words["strPostCodeAddress"]} errorMessage={error?.postCodeDetails?.postCodeAddress} onChange={(e) => onchangeHandler(e)} value={point.postCodeDetails.postCodeAddress} />
              : <React.Fragment></React.Fragment>}
          </div>
        </div>)
        : <React.Fragment></React.Fragment>}
    </>
  );
};

export default CheckingForPostcodes;
