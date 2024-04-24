import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import TextInput from '../../components/elements/TextInput'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import Textarea from '../../components/elements/Textarea'
import { accountRegisterSchemaValidator } from '../../helpers/accountRegisterSchemaValidator'
import AdressInformations from '../../components/elements/AdressInformations'
import { useRouter } from 'next/router'
import useRipple from '../../hooks/useRipple'
import Recaptcha from '../../components/elements/Recaptcha'
import Loading from '../../components/elements/alert/Loading'
import env from '../../resources/env'
import store from '../../store/store'
import { accountRegisterActions } from '../../store/accountRegisterReducer'
import { arTranslation, arTranslation2, enTranslation, enTranslation2, esTranslation, esTranslation2, itTranslation, itTranslation2, ruTranslation, ruTranslation2, trTranslation1, trTranslation2, zhTranslation, zhTranslation2 } from '../../constants/registerTranslations'
let description = "Airport Pickups London agency registration form"
let title = "APPLICATION FOR CREDIT ACCOUNT"
let keywords = ""

const AccountRegister = (props) => {
    let { bggray } = props
    const btnRef = useRef(null);
    const ripples = useRipple(btnRef);
    const router = useRouter()
    const dispatch = useDispatch()
    const [recaptchaToken, setRecapthcaToken] = useState(null);
    const [showRecapthaComponent, setshowRecapthaComponent] = useState(false)
    const [loadingFetch, setLoadingFetch] = useState(false)
    let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
        'errorHolder': [],
    })
    let { errorHolder } = internalState;
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state

    useEffect(() => {
        if (recaptchaToken) {
            const method = "POST"
            const headers = { "Content-Type": "application/json" }
            // const removedUrl = 'https://api.london-tech.com/api/v1/corporate-account/add?passRecaptcha=true';
            const url = `${env.apiDomain}/api/v1/corporate-account/add?passRecaptcha=true&mode=sandbox`;
            const body = {
                "name": companyName,
                "address": address,
                "registrationNumber": registrationNo,
                "natureOfBusiness": natureOfBusiness,

                "contactName": contactName,
                "jobTitle": jobTitle,
                "contactEmail": email,
                "telephone": telephoneNo,

                "extraPaymentShouldPaidBy": accountPassengerStatus === "Account" ? 1 : 2,
                "emergencyPhoneNumber": urgentSituationNumber,
                "rules": anyOtherOperationComments,

                "recaptchaToken": recaptchaToken
            };
            const config = { method, headers, body: JSON.stringify(body), };
            setLoadingFetch(true)
            fetch(url, config)
                .then(response => response.json())
                .then(jsonResponse => {
                    console.log(jsonResponse); // Handle the response data as needed
                    setLoadingFetch(false)
                    if (jsonResponse.status === 100 || jsonResponse.status === 200) {
                        router.push(`${language === 'en' ? "/account-register" : `${language}/account-register`}`)
                    } else {
                        alert("Something went wrong please try again")
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            //localStorage.setItem("recaptchaToken", JSON.stringify(recaptchaToken));
            //
        }
    }, [recaptchaToken])


    const { appData } = useSelector(state => state.initialReducer)
    const accountState = useSelector(state => state.accountRegisterActions)
    const [loadAlert, setLoadAlert] = useState(true)
    if (!accountState) {
        // Render a loading spinner or a placeholder
        store.injectReducer('accountRegisterActions', accountRegisterActions);
        setTimeout(() => { setLoadAlert(false) }, 150);

    }
    if (loadAlert) {
        return <Loading />
    }
    let { accountRegisterDatas } = accountState
    let { applicantForCreditAccount, contactDetails, operationNotes } = accountRegisterDatas
    let { contactName, jobTitle, email, telephoneNo } = contactDetails
    let { companyName, natureOfBusiness, address, registrationNo, } = applicantForCreditAccount
    let { urgentSituationStatus, accountPassengerStatus, anyOtherOperationComments, urgentSituationNumber } = operationNotes


    //companyTel:creditAccountNumber   =>olarak destrctur et
    //telephoneNo:contactDetailsTelephone=>
    const onchangeHandler = (e) => {
        let { name, value, type, checked } = e.target;
        if (['contactName', 'jobTitle', "email"].includes(name))
            dispatch({ type: 'SET_CONTACT_DETAILS', data: { name, value } })
        if (['companyName', "natureOfBusiness", "address", "registrationNo"].includes(name))
            dispatch({ type: 'SET_APPLICANT_FOR_CREADIT_DETAILS', data: { name, value } })
        //in case if it is radio button
        if (['accountPassengerStatus', "urgentSituationStatus", "anyOtherOperationComments"].includes(name))
            dispatch({ type: 'SET_OPERATION_NOTES', data: { name, value } })


    }

    const handleOnChangeNumberInput = (params = {}) => {
        let { value, name, } = params
        if (["telephoneNo"].includes(name)) dispatch({ type: 'SET_CONTACT_DETAILS', data: { name, value } })
        if (["companyTel"].includes(name)) dispatch({ type: 'SET_APPLICANT_FOR_CREADIT_DETAILS', data: { name, value } })
        if (["urgentSituationNumber"].includes(name)) dispatch({ type: 'SET_OPERATION_NOTES', data: { name: "urgentSituationNumber", value } })
    }


    const gotoNextPage = () => {
        let errorHolder = accountRegisterSchemaValidator({ accountRegisterDatas });
        setInternalState({ errorHolder })
        if (errorHolder.status === 200) setshowRecapthaComponent(true)
    }

    // Update the token state when the verification is successful
    const handleRecaptchaVerify = (newToken) => setRecapthcaToken(newToken)



    return (
        <GlobalLayout keywords={keywords} title={title} description={description} footerbggray={true}>
            <div className={`${styles.accountRegister} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.accountRegister_section} page_section`}>
                    <div className={`${styles.accountRegister_section_container} page_section_container`}>

                        {loadingFetch ? <Loading /> : <></>}
                        {/* <h1>{appData.words["strApplicationForCreditAccount"]}</h1> */}
                        <div className={styles.accountRegister_content}>
                            <div className={styles.accountRegister_content_left}>
                                {/* //!Applicant */}

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
                                {/* //!contat details */}
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

                                {/*//! Decleration */}
                                <div className={styles.details_div}>
                                    <p className={styles.amount_credit_title}>{appData?.words["strDeclaration"]}   </p>

                                    {
                                        language === "tr" ?
                                            <p className={styles.declaration}>
                                                {trTranslation1}
                                                <br />
                                                {trTranslation2}
                                            </p> : <></>
                                    }
                                    {
                                        language === "en" ?
                                            <p className={styles.declaration}>
                                                {enTranslation}
                                                <br />
                                                {enTranslation2}
                                            </p> : <></>
                                    }
                                    {
                                        language === "es" ?
                                            <p className={styles.declaration}>
                                                {esTranslation}
                                                <br />
                                                {esTranslation2}
                                            </p> : <></>
                                    }
                                    {
                                        language === "it" ?
                                            <p className={styles.declaration}>
                                                {itTranslation}
                                                <br />
                                                {itTranslation2}
                                            </p> : <></>
                                    }

                                    {
                                        language === "ru" ?
                                            <p className={styles.declaration}>
                                                {ruTranslation}
                                                <br />
                                                {ruTranslation2}
                                            </p> : <></>
                                    }
                                    {
                                        language === "zh" ?
                                            <p className={styles.declaration}>
                                                {zhTranslation}
                                                <br />
                                                {zhTranslation2}
                                            </p> : <></>
                                    }
                                    {
                                        language === "ar" ?
                                            <p className={styles.declaration}>
                                                {arTranslation}
                                                <br />
                                                {arTranslation2}
                                            </p> : <></>
                                    }
                                    <div className={styles.btn_div} onClick={gotoNextPage}>
                                        {!recaptchaToken && !showRecapthaComponent ? <button className='btn btn_primary ' ref={btnRef}>{ripples} {appData.words["strNext"]}</button> : <></>}

                                    </div>
                                    {showRecapthaComponent ?
                                        <div className={styles.recaptcha}>
                                            <Recaptcha onVerify={handleRecaptchaVerify} />
                                        </div>
                                        : <></>}
                                </div>
                            </div>
                            <div className={styles.accountRegister_content_registration_right}>
                                <AdressInformations appData={appData} direction={direction} />
                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}

export default AccountRegister