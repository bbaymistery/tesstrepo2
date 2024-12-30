import React from 'react'
import styles from "./styles.module.scss"
import TextInput from '../../components/elements/TextInput'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
/**
 * Renders the contact details section of the account registration form.
 *
 * @param {object} props - The component props.
 * @param {string} props.contactName - The contact name.
 * @param {object} props.appData - The application data, including localized strings.
 * @param {object} props.errorHolder - The error data for the contact details form fields.
 * @param {function} props.onchangeHandler - The function to handle changes to the form fields.
 * @param {string} props.jobTitle - The contact's job title.
 * @param {string} props.telephoneNo - The contact's telephone number.
 * @param {string} props.direction - The direction of the page layout (ltr or rtl).
 * @param {function} props.handleOnChangeNumberInput - The function to handle changes to the telephone number input.
 * @param {string} props.email - The contact's email address.
 * @returns {JSX.Element} - The rendered contact details section.
 */
const ContactDetails = (props) => {
    
    let { contactName, appData, errorHolder, onchangeHandler, jobTitle, telephoneNo, direction, handleOnChangeNumberInput, email } = props
    return (
        <div className={styles.details_div}>
            <h1>{appData.words["strContactDetails"]}</h1>
            <div className={`${styles.details} ${styles.second_column} `}>
                <div className={styles.input_div}>
                    <TextInput
                        type="text"
                        name="contactName"
                        value={contactName}
                        onChange={e => onchangeHandler(e)}
                        labelStyle={{ color: "#00000094", "fontWeight": 500, letterSpacing: "1px" }}
                        inputStyle={{ color: "#0b0b0cd6" }}
                        label={appData?.words["panelAccountsContactName"]}
                        errorMessage={errorHolder?.accountRegisterDatas?.contactDetails?.contactName} />
                </div>
                <div className={styles.input_div}>
                    <TextInput
                        type="text"
                        name="jobTitle"
                        value={jobTitle}
                        onChange={e => onchangeHandler(e)}
                        label={appData?.words["panelAccountsJobTitle"]}
                        labelStyle={{ color: "#00000094", "fontWeight": 500, letterSpacing: "1px" }}
                        inputStyle={{ color: "#0b0b0cd6" }}
                        errorMessage={errorHolder?.accountRegisterDatas?.contactDetails?.jobTitle} />
                </div>
                <div className={`${styles.input_div} ${direction === "rtl" ? "phone_input_direction" : ""}`}>
                    <PhoneInput
                        className={`phone_input ${direction === "rtl" ? "phone_input_direction" : ""}`}
                        value={telephoneNo}
                        onChange={(value, selectedCountry) => handleOnChangeNumberInput({ value, selectedCountry, name: "telephoneNo" })}
                        country={"gb"}
                        inputProps={{
                            name: 'telephoneNo',
                            required: true,
                            style: { border: errorHolder?.accountRegisterDatas?.contactDetails?.telephoneNo ? '1px solid red' : ' 1px solid #ced4da' }
                        }}
                    />
                </div>


                {/*  */}
                <div className={`${styles.input_div}`} >
                    <TextInput
                        type="text"
                        value={email}
                        name="email"
                        onChange={e => onchangeHandler(e)}
                        label={appData?.words["appContactUsEmailAddress"]}
                        labelStyle={{ color: "#00000094", "fontWeight": 500, letterSpacing: "1px" }}
                        inputStyle={{ color: "#0b0b0cd6" }}
                        errorMessage={errorHolder?.accountRegisterDatas?.contactDetails?.email} />

                </div>
            </div>
        </div>
    )
}

export default ContactDetails