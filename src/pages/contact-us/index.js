import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import { useState } from 'react'
import Accordion from '../../components/elements/Accordion/Accordion'
import Textarea from '../../components/elements/Textarea'
import TextInput from '../../components/elements/TextInput'
import env from '../../resources/env'
import AdressInformations from '../../components/elements/AdressInformations'
import Alert from '../../components/elements/alert/Alert'
import { contentMap } from './insideHelper'

const INITIAL_FORM_VALUE = { email: "", phone: "", subject: "", message: "", fullname: "", }

//!inline helper function for acforion rendering
const renderSection = (section, language, active, setActive, toggleState) => {
    const currentLanguageContent = contentMap[language];
    if (!currentLanguageContent) return null;
    const sectionContent = currentLanguageContent[section];
    const sectionTitle = currentLanguageContent.titles[section];
    let stateOfDangerouslyHtml = "waitingTimeCharges" === section || "pickdropoff" === section;
    return (
        <>
            <p className={styles.popular_topics_title}>{sectionTitle}</p>
            {sectionContent.map((ac, _) => {
                return <Accordion dangerouslyHtml={stateOfDangerouslyHtml} id={ac.id} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
            })}
        </>
    );
};
//!Inline component
const ContactUsForm = ({ appData, formValue, onChangeHandler, error, handleSend }) => (
    <div className={styles.form_content}>
        <div className={styles.contact_form_action}>
            <form className={styles.form}>
                <div className={styles.input_box}>
                    <div className={styles.input}>
                        <TextInput label={appData?.words["appContactUsFormFullname"]} type="text" name="fullname" onChange={onChangeHandler} value={formValue.fullname} errorMessage={error.fullname} />
                    </div>
                    <div className={styles.input}>
                        <TextInput label={appData?.words["appContactUsFormSubject"]} type="text" name="subject" onChange={onChangeHandler} value={formValue.subject} errorMessage={error.subject} />
                    </div>
                </div>
                <div className={styles.input_box}>
                    <div className={styles.input}>
                        <TextInput label={appData?.words["appContactUsEmailAddress"]} type="text" name="email" onChange={onChangeHandler} value={formValue.email} errorMessage={error.email} />
                    </div>
                    <div className={styles.input}>
                        <TextInput label={appData?.words["appContactUsFormPhone"]} type="text" name="phone" onChange={onChangeHandler} value={formValue.phone} errorMessage={error.phone} />
                    </div>
                </div>
            </form>
            <div className={`${styles.input} ${styles.inp_textarea}`}>
                <Textarea label={appData?.words["appContactUsFormMessage"]} name="message" value={formValue.message} onChange={onChangeHandler} errorMessage={error.message} />
            </div>
            <div className={styles.lodbtn}>
                <button onClick={handleSend} className='btn '>{appData?.words["appContactUsFormButton"]}</button>
            </div>
        </div>
    </div>
);


const ContactUs = ({ bggray }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state
    const { appData } = useSelector(state => state.initialReducer)

    const [formValue, setFormValue] = useState(INITIAL_FORM_VALUE);
    const [error, setError] = useState(INITIAL_FORM_VALUE);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeHandler = (e) => setFormValue((values) => ({ ...values, [e.target.name]: e.target.value }));

    const handleSend = () => {
        let newErrors = {};
        let isValid = true;
        // Check for required fields
        Object.keys(formValue).forEach((key) => {
            if (!formValue[key]) {
                newErrors[key] = "Required";
                isValid = false;
            }
        });
        if (isValid) {
            dispatch({ type: "ALERT", payload: { loading: true } })
            const method = "POST"
            const headers = { Accept: "application/json, text/plain, */*", "Content-Type": "application/json", }
            const body = JSON.stringify({ senderId: 1, reciverMails: [formValue.email], subject: formValue.subject, mailContent: formValue.message })
            let reqOptions = { method, body, headers, };

            fetch(`${env.apiDomain}/tools/mailer`, reqOptions)
                .then((res) => handleSuccess(res))
                .catch(handleCatchError);
        } else {
            setError((error) => ({ ...error, ...newErrors }));
        }

    }
    const handleSuccess = (res) => {
        dispatch({ type: "ALERT", payload: { loading: false } })
        if (res.status === 200) {
            dispatch({ type: "ALERT", payload: { success: "Email successfully sended" } })
            resetForm()
        }
    }
    const handleCatchError = () => {
        dispatch({ type: "ALERT", payload: { errors: "Something went wrong" } })
        resetForm()
    }
    //we reset form if have sth goes wrong on handle  catch error or get success by handleSuccess
    const resetForm = () => {
        setError(INITIAL_FORM_VALUE);
        setFormValue(INITIAL_FORM_VALUE);
    }
    const [active, setActive] = useState(null);

    const toggleState = (e) => {
        //togglus yazsak biri otomatik acg galar
        if (e === active) return setActive(null);
        setActive(e);
    };

    useEffect(() => {
        const timer = setTimeout(() => { setIsLoading(false); }, 250);
        return () => clearTimeout(timer);
    }, []);


    return (
        <GlobalLayout title="Contact Us" keywords="Contact Us" description="Contact Us" footerbggray={true}>
            <div className={`${styles.contact_us} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.contact_us_section} page_section`}>
                    <Alert />
                    <div className={`${styles.contact_us_section_container} page_section_container`}>
                        <div className={styles.contact_area}>
                            <div className={styles.contact_container}>
                                <div className={styles.left}>
                                    <div className={styles.form_box}>
                                        <div className={styles.form_title_wrap}>
                                            <h3 className={styles.title}>{appData?.words["strWeLoveToHearFromYou"]}</h3>
                                            <p className={styles.desc}>{appData?.words["strSendUsAMessageAnd"]}</p>
                                        </div>
                                        <ContactUsForm appData={appData} formValue={formValue} onChangeHandler={onChangeHandler} error={error} handleSend={handleSend} />
                                    </div>
                                    {isLoading ? ".." : (
                                        <>
                                            {renderSection('bookingAndReservations', language, active, setActive, toggleState)}
                                            {renderSection('pricePayments', language, active, setActive, toggleState)}
                                            {renderSection('waitingTimeCharges', language, active, setActive, toggleState)}
                                            {renderSection('vehicles', language, active, setActive, toggleState)}
                                            {renderSection('pickdropoff', language, active, setActive, toggleState)}
                                        </>
                                    )}
                                </div>

                                {/* <AdressInformation direction={direction} /> */}
                                <div className={styles.right}>
                                    <AdressInformations direction={direction} appData={appData} />
                                    <div className={styles.qr_image_div}>
                                        <img src="/images/others/contactUsQr.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}

export default ContactUs