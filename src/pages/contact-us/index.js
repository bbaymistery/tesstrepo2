import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import {
    ar_bookingAndReservations,
    ar_pickdropoff,
    ar_pricePayments,
    ar_vehicles,
    ar_waitingTimeCharges,
    bookingAndReservations,
    es_bookingAndReservations,
    es_pickdropoff,
    es_pricePayments,
    es_vehicles,
    es_waitingTimeCharges,
    it_bookingAndReservations,
    it_pickdropoff,
    it_pricePayments,
    it_vehicles,
    it_waitingTimeCharges,
    pickdropoff, pricePayments,
    ru_bookingAndReservations,
    ru_pickdropoff,
    ru_pricePayments,
    ru_vehicles,
    ru_waitingTimeCharges,
    tr_bookingAndReservations,
    tr_pickdropoff, tr_pricePayments,
    tr_vehicles, tr_waitingTimeCharges,
    vehicles, waitingTimeCharges, zh_bookingAndReservations, zh_pickdropoff, zh_pricePayments, zh_vehicles, zh_waitingTimeCharges
} from '../../constants/faqs'
import { useState } from 'react'
import Accordion from '../../components/elements/Accordion/Accordion'
import Textarea from '../../components/elements/Textarea'
import TextInput from '../../components/elements/TextInput'
import env from '../../resources/env'
import AdressInformations from '../../components/elements/AdressInformations'
import Alert from '../../components/elements/alert/Alert'
const initialFormValue = { email: "", phone: "", subject: "", message: "", fullname: "", }
const ContactUs = (props) => {
    let { bggray } = props
    //appContactUsHeader

    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state
    const { appData } = useSelector(state => state.initialReducer)

    const dispatch = useDispatch()
    const [formValue, setFormValue] = useState(initialFormValue);
    const [error, setError] = useState(initialFormValue);
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
            const body = JSON.stringify({
                senderId: 1,
                reciverMails: [formValue.email],
                subject: formValue.subject,
                mailContent: formValue.message
            })
            let reqOptions = { method, body, headers, };
            fetch(`${env.apiDomain}/tools/mailer`, reqOptions)
                .then((res) => {
                    dispatch({ type: "ALERT", payload: { loading: false } })
                    if (res.status === 200) {
                        dispatch({ type: "ALERT", payload: { success: "Email successfully sended" } })
                        setError({ email: "", phone: "", subject: "", message: "", fullname: "", });
                        setFormValue({ email: "", phone: "", subject: "", message: "", fullname: "", });
                    }
                })
                .catch((e) => {
                    dispatch({ type: "ALERT", payload: { errors: "Something went wrong" } })
                    setError({ email: "", phone: "", subject: "", message: "", fullname: "", });
                    setFormValue({ email: "", phone: "", subject: "", message: "", fullname: "", });
                });
        } else {
            setError((error) => ({ ...error, ...newErrors }));
        }

    }


    const [active, setActive] = useState(null);

    const toggleState = (e) => {
        //togglus yazsak biri otomatik acg galar
        if (e === active) return setActive(null);
        setActive(e);
    };

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
                                            <p className={styles.desc}>
                                                {appData?.words["strSendUsAMessageAnd"]}
                                            </p>
                                        </div>
                                        <div className={styles.form_content}>
                                            <div className={styles.contact_form_action}>
                                                <form className={styles.form}>
                                                    <div className={styles.input_box}>
                                                        <div className={styles.input}>
                                                            <TextInput label={appData?.words["appContactUsFormFullname"]} type="text" name="fullname" onChange={onChangeHandler} value={formValue.fullname} errorMessage={error.fullname} />
                                                        </div>
                                                        <div className={styles.input}>
                                                            <TextInput label={appData?.words["appContactUsFormSubject"]} name="subject" type="text" onChange={onChangeHandler} value={formValue.subject} errorMessage={error.subject} />
                                                        </div>
                                                    </div>
                                                    <div className={styles.input_box}>
                                                        <div className={styles.input}>
                                                            <TextInput label={appData?.words["appContactUsEmailAddress"]} name="email" type="text" onChange={onChangeHandler} value={formValue.email} errorMessage={error.email} />
                                                        </div>
                                                        <div className={styles.input}>
                                                            <TextInput label={appData?.words["appContactUsFormPhone"]} name="phone" type="text" onChange={onChangeHandler} value={formValue.phone} errorMessage={error.phone} />
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
                                    </div>
                                    {language === "en" ? <p className={styles.popular_topics_title}>Booking and Reservations </p> : <></>}
                                    {language === "tr" ? <p className={styles.popular_topics_title}>Rezervasyon ve Kayıtlar </p> : <></>}
                                    {language === "ar" ? <p className={styles.popular_topics_title}>حجوزات والحجز </p> : <></>}
                                    {language === "ru" ? <p className={styles.popular_topics_title}>Бронирование и резервирование</p> : <></>}
                                    {language === "es" ? <p className={styles.popular_topics_title}>Reservas y Reservaciones</p> : <></>}
                                    {language === "it" ? <p className={styles.popular_topics_title}>Prenotazioni e Riservazioni</p> : <></>}
                                    {language === "zh" ? <p className={styles.popular_topics_title}>预订和预约</p> : <></>}

                                    {language === 'en' ? bookingAndReservations.map((ac, i) => {
                                        return (
                                            <Accordion key={i} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'tr' ? tr_bookingAndReservations.map((ac, i) => {
                                        return (
                                            <Accordion key={i} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ar' ? ar_bookingAndReservations.map((ac, i) => {
                                        return (
                                            <Accordion key={i} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ru' ? ru_bookingAndReservations.map((ac, i) => {
                                        return (
                                            <Accordion key={i} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'zh' ? zh_bookingAndReservations.map((ac, i) => {
                                        return (
                                            <Accordion key={i} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'it' ? it_bookingAndReservations.map((ac, i) => {
                                        return (
                                            <Accordion key={i} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'es' ? es_bookingAndReservations.map((ac, i) => {
                                        return (
                                            <Accordion key={i} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === "en" ? <p className={styles.popular_topics_title}>Pricing and Payment </p> : <></>}
                                    {language === "tr" ? <p className={styles.popular_topics_title}>Fiyatlandırma ve Ödeme </p> : <></>}
                                    {language === "ar" ? <p className={styles.popular_topics_title}>التسعير والدفع </p> : <></>}
                                    {language === "ru" ? <p className={styles.popular_topics_title}>Ценообразование и оплата</p> : <></>}
                                    {language === "es" ? <p className={styles.popular_topics_title}> Precios y Pago</p> : <></>}
                                    {language === "it" ? <p className={styles.popular_topics_title}>Prezzi e Pagamento</p> : <></>}
                                    {language === "zh" ? <p className={styles.popular_topics_title}>定价和支付</p> : <></>}

                                    {language === 'en' ? pricePayments.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'tr' ? tr_pricePayments.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ar' ? ar_pricePayments.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ru' ? ru_pricePayments.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'zh' ? zh_pricePayments.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'it' ? it_pricePayments.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'es' ? es_pricePayments.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === "en" ? <p className={styles.popular_topics_title}>Waiting Time Charges</p> : <></>}
                                    {language === "tr" ? <p className={styles.popular_topics_title}>Bekleme Süresi Ücretleri</p> : <></>}
                                    {language === "ar" ? <p className={styles.popular_topics_title}>رسوم وقت الانتظار</p> : <></>}
                                    {language === "ru" ? <p className={styles.popular_topics_title}>Тарифы за ожидание</p> : <></>}
                                    {language === "es" ? <p className={styles.popular_topics_title}>Cargos por Tiempo de Espera</p> : <></>}
                                    {language === "it" ? <p className={styles.popular_topics_title}>Costi per Tempo di Attesa</p> : <></>}
                                    {language === "zh" ? <p className={styles.popular_topics_title}>等待时间费用</p> : <></>}

                                    {language === 'en' ? waitingTimeCharges.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'tr' ? tr_waitingTimeCharges.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ar' ? ar_waitingTimeCharges.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ru' ? ru_waitingTimeCharges.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'zh' ? zh_waitingTimeCharges.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'it' ? it_waitingTimeCharges.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'es' ? es_waitingTimeCharges.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === "en" ? <p className={styles.popular_topics_title}>Vehicles and Services</p> : <></>}
                                    {language === "tr" ? <p className={styles.popular_topics_title}>Araçlar ve Hizmetler</p> : <></>}
                                    {language === "ar" ? <p className={styles.popular_topics_title}>المركبات والخدمات</p> : <></>}
                                    {language === "ru" ? <p className={styles.popular_topics_title}>Транспортные средства и услуги</p> : <></>}
                                    {language === "es" ? <p className={styles.popular_topics_title}>Vehículos y Servicios</p> : <></>}
                                    {language === "it" ? <p className={styles.popular_topics_title}>Veicoli e Servizi</p> : <></>}
                                    {language === "zh" ? <p className={styles.popular_topics_title}>车辆和服务</p> : <></>}

                                    {language === 'en' ? vehicles.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={false} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'tr' ? tr_vehicles.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={false} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ar' ? ar_vehicles.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={false} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ru' ? ru_vehicles.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={false} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'zh' ? zh_vehicles.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={false} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'it' ? it_vehicles.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={false} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'es' ? es_vehicles.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={false} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === "en" ? <p className={styles.popular_topics_title}>Pickup and Drop-off</p> : <></>}
                                    {language === "tr" ? <p className={styles.popular_topics_title}>Alım ve Bırakma Noktaları</p> : <></>}
                                    {language === "ar" ? <p className={styles.popular_topics_title}>الاستقبال والتوصيل</p> : <></>}
                                    {language === "ru" ? <p className={styles.popular_topics_title}>Подбор и Высадка</p> : <></>}
                                    {language === "es" ? <p className={styles.popular_topics_title}>Recogida y Entrega</p> : <></>}
                                    {language === "it" ? <p className={styles.popular_topics_title}>Ritiro e Consegna</p> : <></>}
                                    {language === "zh" ? <p className={styles.popular_topics_title}>接送</p> : <></>}


                                    {language === 'en' ? pickdropoff.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}


                                    {language === 'tr' ? tr_pickdropoff.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ar' ? ar_pickdropoff.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'ru' ? ru_pickdropoff.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'zh' ? zh_pickdropoff.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'it' ? it_pickdropoff.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
                                    {language === 'es' ? es_pickdropoff.map((ac, i) => {
                                        return (
                                            <Accordion key={ac.id} dangerouslyHtml={true} title={ac.title} active={active} setActive={setActive} toggleState={toggleState} content={ac.content} />
                                        );
                                    }) : <></>}
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