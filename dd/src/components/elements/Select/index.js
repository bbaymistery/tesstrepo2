import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FlightWaitingTimeContent from '../FlightWaitingTimeContent';
import styles from "./styles.module.scss";

/**
 * A React component that renders a select dropdown with various options and additional functionality.
 *
 * @param {object} props - The component props.
 * @param {string} [props.name] - The name of the select field.
 * @param {string} [props.value] - The current value of the select field.
 * @param {string} [props.label] - The label for the select field.
 * @param {string} [props.errorMessage] - An error message to display if the select field is invalid.
 * @param {function} [props.onChange] - A callback function to handle changes to the select field.
 * @param {string} [props.postCodeSelectOption] - A flag to indicate if the select options are post codes.
 * @param {array} props.data - The data to populate the select options.
 * @param {boolean} [props.flightSelectOption] - A flag to indicate if the select options are flight numbers.
 * @param {boolean} [props.flightInfoIcon] - A flag to indicate if a flight information icon should be displayed.
 * @param {boolean} [props.isTaxiDeal] - A flag to indicate if the select is part of a taxi deal.
 * @returns {JSX.Element} - The Select component.
 */
const Select = (props) => {
  
  let { name = "", value = "", label = "", errorMessage = "", onChange = (e) => { }, postCodeSelectOption = "", data, flightSelectOption = false, flightInfoIcon = false, isTaxiDeal, } = props
  const dispatch = useDispatch()
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { direction } } = state
  const setModalInfo = (par) => dispatch({ type: "SET_MODAL_INFO", data: { trueOrFalse: true } })
  return (
    <div className={styles.select_wrapper}>
      <label className={`${styles.select} `} direction={String(direction === 'rtl')} err={String(typeof errorMessage === 'string' && errorMessage.length > 0)} >
        <select direction={String(direction === 'rtl')} className={styles.select__field} required name={name} onChange={onChange} defaultValue={value} >
          {parseInt(data)
            ? Array(data).fill().map((x, i) => <option key={i} id={i + 1} value={i + 1} >{i + 1}</option>)
            : data?.map((d, i) => {

              //here we check d.id typeof string for flight number (go to component Checkfor flight )
              if (typeof d.id === 'string' && typeof d.value === 'string' && flightSelectOption === true) {
                return <option key={i} value={d.id} > {d.value}</option>
              }
              //here we check d.if isInteger for postcodes
              else if (typeof d.value === 'string' && postCodeSelectOption === true) {

                return <option key={i} value={d.id} > {d.value}</option>
              }
              else {

                <option key={i} id={d.id} value={d.value}> {d.value}</option>
              }
            })}
        </select>
        {errorMessage ? <p className={styles.form_input_error}>{errorMessage}</p> : <React.Fragment></React.Fragment>}

        <span id="icon" direction={String(direction === 'rtl')} className={styles.select__label} >{label}</span>
        {/* we dont wanna show by hoveer when we r in taxi deals  */}
        {!isTaxiDeal && flightInfoIcon ? <div className={`${styles.flightinfo_div}`}>  <FlightWaitingTimeContent />  </div> : <React.Fragment></React.Fragment>}
      </label>
      {/* if is taxideal is true then we r gonna show content by modal  */}
      {flightInfoIcon ? <i direction={String(direction === 'rtl')} className={`fa-solid fa-circle-info ${styles.info_icon}  ${isTaxiDeal ? styles.istaxideal_info_icon : ""}`} onClick={setModalInfo}></i> : <React.Fragment></React.Fragment>}
    </div>
  )
}

export default Select
