import TextInput from "../../components/elements/TextInput";
import styles from "./styles.module.scss"

/**
 * Renders the Applicant Details section of the account registration form.
 * 
 * @param {object} props - The component props.
 * @param {string} props.companyName - The company name entered by the user.
 * @param {string} props.natureOfBusiness - The nature of business entered by the user.
 * @param {string} props.address - The address entered by the user.
 * @param {string} props.registrationNo - The registration number entered by the user.
 * @param {object} props.errorHolder - An object containing any error messages for the form fields.
 * @param {function} props.onchangeHandler - A function to handle changes to the form fields.
 * @param {object} props.appData - An object containing application data, including localized strings.
 * @returns {JSX.Element} - The rendered Applicant Details section.
 */
const ApplicantDetails = (props) => {

    let { companyName, natureOfBusiness, address, registrationNo, errorHolder, onchangeHandler, appData } = props
    return (
        <div className={styles.details_div}>
            <h1>{appData?.words["strApplicationForCreditAccount"]}</h1>
            <div className={`${styles.details} ${styles.first_column} `}>
                <div className={`${styles.input_div} `} >
                    {/* #535b6b94 */}
                    <TextInput
                        type="text"
                        value={companyName}
                        name="companyName"
                        onChange={e => onchangeHandler(e)}
                        label={`${appData?.words["strCompanyName"]}`}
                        labelStyle={{ color: "#00000094", "fontWeight": 500, letterSpacing: "1px" }}
                        inputStyle={{ color: "#0b0b0cd6" }}
                        errorMessage={errorHolder?.accountRegisterDatas?.applicantForCreditAccount?.companyName} />
                </div>
                <div className={`${styles.input_div} `} >
                    <TextInput
                        type="text"
                        value={natureOfBusiness}
                        name="natureOfBusiness"
                        onChange={e => onchangeHandler(e)}
                        label={appData?.words["strNatureOfBusiness"]}
                        labelStyle={{ color: "#00000094", "fontWeight": 500, letterSpacing: "1px" }}
                        inputStyle={{ color: "#0b0b0cd6" }}
                        errorMessage={errorHolder?.accountRegisterDatas?.applicantForCreditAccount?.natureOfBusiness} />
                </div>
                <div className={styles.input_div}>
                    <TextInput
                        type="text"
                        name="address"
                        value={address}
                        onChange={e => onchangeHandler(e)}
                        label={appData?.words["strAddress"]}
                        labelStyle={{ color: "#00000094", "fontWeight": 500, letterSpacing: "1px" }}
                        inputStyle={{ color: "#0b0b0cd6" }}
                        errorMessage={errorHolder?.accountRegisterDatas?.applicantForCreditAccount?.address}
                    />
                </div>
                <div className={styles.input_div}>
                    <TextInput
                        type="text"
                        name="registrationNo"
                        value={registrationNo}
                        onChange={e => onchangeHandler(e)}
                        label={appData?.words["strRegistrationNo"]}
                        labelStyle={{ color: "#00000094", "fontWeight": 500, letterSpacing: "1px" }}
                        inputStyle={{ color: "#0b0b0cd6" }}
                    />
                </div>
            </div>
        </div>
    )
}


export default ApplicantDetails