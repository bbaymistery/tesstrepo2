import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import { accountRegisterSchemaValidator } from '../../helpers/accountRegisterSchemaValidator'
import AdressInformations from '../../components/elements/AdressInformations'
import { useRouter } from 'next/router'
import useRipple from '../../hooks/useRipple'
import Recaptcha from '../../components/elements/Recaptcha'
import Loading from '../../components/elements/alert/Loading'
import env from '../../resources/env'
import store from '../../store/store'
import { accountRegisterActions } from '../../store/accountRegisterReducer'
import ApplicantDetails from './ApplicantDetails'
import ContactDetails from './ContactDetails'
import OperationNotes from './OperationNotes'
import { Translation } from './Translation'
import 'react-phone-input-2/lib/style.css'

const description = "Airport Pickups London agency registration form"
const title = "APPLICATION FOR CREDIT ACCOUNT"
const keywords = ""


//to translate declaration manually 

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
                                <ApplicantDetails companyName={companyName} natureOfBusiness={natureOfBusiness} address={address} registrationNo={registrationNo} errorHolder={errorHolder} onchangeHandler={onchangeHandler} appData={appData} />
                                <ContactDetails email={email} handleOnChangeNumberInput={handleOnChangeNumberInput} direction={direction} contactName={contactName} appData={appData} errorHolder={errorHolder} onchangeHandler={onchangeHandler} jobTitle={jobTitle} telephoneNo={telephoneNo} />
                                <OperationNotes appData={appData} onchangeHandler={onchangeHandler} urgentSituationStatus={urgentSituationStatus} direction={direction} handleOnChangeNumberInput={handleOnChangeNumberInput} anyOtherOperationComments={anyOtherOperationComments} accountPassengerStatus={accountPassengerStatus} errorHolder={errorHolder} urgentSituationNumber={urgentSituationNumber} />
                                {/*//! Decleration */}
                                <div className={styles.details_div}>
                                    <p className={styles.amount_credit_title}>{appData?.words["strDeclaration"]}   </p>
                                    <Translation language={language} />
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