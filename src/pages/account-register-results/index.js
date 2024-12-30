import React, { useEffect, useRef } from 'react'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import { useSelector } from 'react-redux'
import AdressInformations from '../../components/elements/AdressInformations'
import useRipple from '../../hooks/useRipple'
import store from '../../store/store'
import { createWrapper } from 'next-redux-wrapper'
// import { urlWithLangAtribute } from '../../helpers/urlWithLangAtrribute'
import { useRouter } from 'next/router'
let title = "APPLICATION FOR CREDIT ACCOUNT"
let keywords = ""
let description = "Airport Pickups London agency registration form"
const AccountRegisterResults = (props) => {
    let { bggray } = props


    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state

    const { appData } = useSelector(state => state.initialReducer)

    const { accountRegisterDatas } = useSelector(state => state.accountRegisterActions)

    let { applicantForCreditAccount, contactDetails, operationNotes } = accountRegisterDatas
    let { contactName, jobTitle, email, telephoneNo } = contactDetails
    let { companyName, natureOfBusiness, address, registrationNo } = applicantForCreditAccount
    let { urgentSituationStatus, accountPassengerStatus, anyOtherOperationComments, urgentSituationNumber } = operationNotes
    const prevRef = useRef(null);
    const prevRipples = useRipple(prevRef);
    const nextRef = useRef(null)
    const router = useRouter()

    //in order having confirmation message
    //go back go forward and when change language we r not gonna have any confirmation
    // const { nexturls, previousUrls, currentUrls } = urlWithLangAtribute({ languages: appData.languages, previousUrl: 'tohome', nextUrl: "/", currentUrl: router.asPath })
    // const confirmationAlert = useConfirm({ previousUrl: previousUrls, nextUrl: nexturls, currentUrls, message: "Registration Completed Successfully. Do you want to leave this page?" })

    useEffect(() => {
        const disableBackButton = () => {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = () => {
                window.history.pushState(null, null, window.location.href);
            };
        };

        // Call disableBackButton() once when the component mounts
        disableBackButton();
    }, [])

    return (
        <GlobalLayout keywords={keywords} title={title} description={description} footerbggray={true}>
            <div className={`${styles.account_results_details} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.account_results_details_section} page_section`}>
                    <div className={`${styles.account_results_details_section_container} page_section_container`}>

                        <div className={styles.content}>
                            <div className={styles.left_content}>
                                <h1 >{appData?.words["strRegistrationCompletedSuccessfully"]}</h1>
                                <div className={styles.info_section}>
                                    {/*//! Applicant for credit */}

                                    <h2>{appData.words["strApplicationForCreditAccount"]}</h2>
                                    <div className={`${styles.info} ${styles.companyName_info} ${direction}`}>
                                        <div className={styles.left}>{appData?.words["strCompanyName"]}/Sole Trader Name</div>
                                        <div className={styles.right}>{companyName} </div>
                                    </div>
                                    <div className={`${styles.info} ${direction}`}>
                                        <div className={styles.left}>{appData?.words["strNatureOfBusiness"]} </div>
                                        <div className={styles.right}>{natureOfBusiness}</div>
                                    </div>
                                    {/*  */}
                                    {registrationNo.length > 0 ?
                                        <div className={`${styles.info} ${direction}`}>
                                            <div className={styles.left}>{appData?.words["strRegistrationNo"]}</div>
                                            <div className={styles.right}>{registrationNo}</div>
                                        </div> : <></>}



                                    <div className={`${styles.info} ${direction}`}>
                                        <div className={styles.left}>{appData?.words["strAddress"]}</div>
                                        <div className={styles.right}>{address}</div>
                                    </div>
                                    {/* //!Contact details */}
                                    <h2 style={{ marginTop: '1.5rem' }}>{appData.words["strContactDetails"]}</h2>
                                    <div className={`${styles.info} ${direction}`}>
                                        <div className={styles.left}>{appData?.words["panelAccountsContactName"]} </div>
                                        <div className={styles.right}>{contactName}</div>
                                    </div>

                                    <div className={`${styles.info} ${direction}`}>
                                        <div className={styles.left}>{appData?.words["panelAccountsJobTitle"]}</div>
                                        <div className={styles.right}>{jobTitle}</div>
                                    </div>

                                    <div className={`${styles.info} ${direction}`}>
                                        <div className={styles.left}>{appData?.words["panelAccountsTelephone"]}</div>
                                        <div className={styles.right}>{telephoneNo}</div>
                                    </div>
                                    <div className={`${styles.info} ${direction}`}>
                                        <div className={styles.left}>{appData?.words["appContactUsEmailAddress"]}</div>
                                        <div className={styles.right}>{email}</div>
                                    </div>


                                    {/* //!Contact details */}
                                    <h2 style={{ marginTop: '1.5rem' }}>Operation Notes</h2>
                                    <div className={`${styles.info} ${styles.operationNotes_info} ${direction}`}>
                                        <div className={styles.left} style={{ textTransform: "inherit" }}>{appData?.words["strDoYouHaveAnyOutOfHours"]}</div>
                                        {urgentSituationStatus === 'Yes' ? <div className={styles.right}>+ {urgentSituationNumber}</div> : <div className={styles.right}>{urgentSituationStatus}</div>}
                                    </div>

                                    <div className={`${styles.info} ${styles.operationNotes_info} ${direction}`}>
                                        <div className={styles.left} style={{ textTransform: "inherit" }}>{appData?.words["strInCaseOfExtraPayment"]}</div>
                                        <div className={styles.right}>{accountPassengerStatus}</div>

                                    </div>

                                    <div className={`${styles.info} ${styles.operationNotes_info} ${direction}`}>
                                        <div className={styles.left} style={{ textTransform: "inherit" }}>{appData?.words["strAnyOtherOperationComments"]}</div>
                                        <div className={styles.right}>{anyOtherOperationComments ? anyOtherOperationComments : '--'}</div>

                                    </div>



                                    <div className={styles.buttons}>
                                        <a href={language === 'en' ? '/' : `/${language}`}>
                                            <button ref={nextRef} className='btn btn_primary'>{prevRipples}{appData?.words["strNavHome"]}</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.contact_section}>
                                <AdressInformations appData={appData} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </GlobalLayout>
    )
}

export default AccountRegisterResults
const makestore = () => store;
const wrapper = createWrapper(makestore);

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {

    const initialLanguages = store.getState().initialReducer?.appData?.languages
    const langs = initialLanguages.map((lang) => lang.value)

    for (let i = 0; i < langs.length; i++) {
        const lang = langs[i]
        const langUrl = lang === 'en' ? '/account-register-results' : `/${lang}/account-register-results`
        if (req.url === langUrl) {
            return {
                redirect: {
                    destination: lang === 'en' ? "/" : `/${lang}`,
                    permanent: false
                }
            }
        }
    }


    return {
        props: {
            data: ''
        }
    }
});