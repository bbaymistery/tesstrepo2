import React from 'react'
import styles from "./styles.module.scss"
import PhoneInput from 'react-phone-input-2'
import Textarea from '../../components/elements/Textarea'
import 'react-phone-input-2/lib/style.css'

/**
 * Renders the OperationNotes component, which displays a form for capturing operation-related information for an account registration process.
 * 
 * The component renders the following form fields:
 * - Urgent Situation Status (Yes/No)
 * - Urgent Situation Number (if Urgent Situation Status is Yes)
 * - Account/Passenger Status (for extra payment)
 * - Any Other Operation Comments
 * 
 * The component receives various props to handle the form state and behavior, such as `onchangeHandler`, `handleOnChangeNumberInput`, and `errorHolder`.
 * 
 * @param {object} props - The props passed to the OperationNotes component.
 * @param {object} props.appData - The application data, including localized strings.
 * @param {function} props.onchangeHandler - A function to handle changes in the form fields.
 * @param {string} props.urgentSituationNumber - The value of the Urgent Situation Number field.
 * @param {string} props.direction - The direction of the text (RTL or LTR).
 * @param {function} props.handleOnChangeNumberInput - A function to handle changes in the Urgent Situation Number field.
 * @param {string} props.anyOtherOperationComments - The value of the Any Other Operation Comments field.
 * @param {string} props.urgentSituationStatus - The value of the Urgent Situation Status field.
 * @param {string} props.accountPassengerStatus - The value of the Account/Passenger Status field.
 * @param {object} props.errorHolder - An object containing error messages for the form fields.
 */
const OperationNotes = (props) => {
    
    let { appData, onchangeHandler, urgentSituationNumber, direction, handleOnChangeNumberInput, anyOtherOperationComments,urgentSituationStatus,accountPassengerStatus ,errorHolder } = props
    return (
        <div className={styles.details_div}>
            <h1>{appData?.words["strOperationNotes"]}</h1>
            <div className={`${styles.details} ${styles.operation_details}`}>
                <div className={`${styles.input_div} ${styles.the_checkbox_div}`}>
                    <p>{appData?.words["strDoYouHaveAnyOutOfHours"]}</p>
                    <div className={styles.radio_input_content}>
                        <div>
                            <input onChange={(e) => onchangeHandler(e)} defaultChecked={urgentSituationStatus === 'Yes'} type="radio" id="UrgentSituationYes" name="urgentSituationStatus" value={"Yes"} />
                            <label htmlFor="UrgentSituationYes">{appData?.words["statusYes"]}</label><br />
                        </div>

                        <div>
                            <input onChange={(e) => onchangeHandler(e)} defaultChecked={urgentSituationStatus === 'No'} type="radio" id="UrgentSituationNo" name="urgentSituationStatus" value={"No"} />
                            <label htmlFor="UrgentSituationNo">{"No"}</label><br />
                        </div>
                    </div>
                    {urgentSituationStatus === 'Yes' ?
                        <div className={`${styles.input_div} ${direction === "rtl" ? "phone_input_direction" : ""}`}>
                            <PhoneInput
                                className={`phone_input ${direction === "rtl" ? "phone_input_direction" : ""}`}
                                value={urgentSituationNumber}
                                onChange={(value, selectedCountry) => handleOnChangeNumberInput({ value, selectedCountry, name: "urgentSituationNumber" })}
                                country={"gb"}
                                inputProps={{
                                    name: 'urgentSituationNumber',
                                    required: true,
                                    style: { border: errorHolder?.accountRegisterDatas?.operationNotes?.urgentSituationNumber ? '1px solid red' : ' 1px solid #ced4da' }
                                }}
                            />
                        </div>
                        : <></>}
                </div>
                <div className={`${styles.input_div} ${styles.the_checkbox_div}`}>
                    <p>{appData?.words["strInCaseOfExtraPayment"]}</p>
                    <div className={styles.radio_input_content}>
                        <div>
                            <input onChange={(e) => onchangeHandler(e)} defaultChecked={accountPassengerStatus === 'Account'} type="radio" id="Account" name="accountPassengerStatus" value={"Account"} />
                            <label htmlFor="Account">{appData?.words["strAccountTitle"]}</label><br />
                        </div>
                        <div>
                            <input onChange={(e) => onchangeHandler(e)} defaultChecked={accountPassengerStatus === 'Passenger'} type="radio" id="Passenger" name="accountPassengerStatus" value={"Passenger"} />
                            <label htmlFor="Passenger">{appData?.words["strPassengerTitle"]}</label><br />
                        </div>
                    </div>
                </div>
                <div className={`${styles.input_div} ${styles.last_input_item}`} >
                    <Textarea
                        name="anyOtherOperationComments"
                        value={anyOtherOperationComments}
                        label={appData?.words["strAnyOtherOperationComments"]}
                        onChange={(e) => onchangeHandler(e)}
                        labelStyle={{ color: "#00000094", "fontWeight": 500, letterSpacing: "1px" }}
                        inputStyle={{ color: "#0b0b0cd6" }}
                        errorMessage={errorHolder?.accountRegisterDatas?.operationNotes?.anyOtherOperationComments} />
                </div>
            </div>
        </div>
    )
}

export default OperationNotes