import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../components/elements/TextInput";
import TextArea from "../../components/elements/Textarea";
import Layout from "../../components/layouts/Layout";
import Address from "./Address";
import Alert from '../../components/elements/Alert'
import styles from "./styles.module.scss";
import { getWindowDimensions } from "../../helpers/windowDimension";
import { SET_ACTIVELINK_ID } from "../../store/showFieldReducer/showFieldTypes";
import { parseCookies } from "../../helpers/cokieesFunc";
const ContactUs = (props) => {

    let { data, env } = props

    const dispatch = useDispatch()
    const [formValue, setFormValue] = useState({ email: "", phone: "", subject: "", message: "", fullname: "", });
    const [error, setError] = useState({ email: "", phone: "", subject: "", message: "", fullname: "", });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ alert: false, message: "", close: false, });

    // Function to handle changes in form inputs
    const onChangeHandler = (e) => {
        setFormValue((values) => ({ ...values, [e.target.name]: e.target.value }));
    };

    // Function to handle form submission with validations and sending data
    const handleSend = () => {
        // Helper function to set error if field is empty
        const setErrorIfEmpty = (field) => {
            if (!formValue[field]) {
                setError((prevErrors) => ({ ...prevErrors, [field]: "Required" }));
            }
        };

        // Validating each form field
        ["email", "phone", "subject", "message", "fullname"].forEach(setErrorIfEmpty);

        // Check if all fields are filled
        const allFieldsFilled = Object.values(formValue).every((value) => value);
        if (allFieldsFilled) {
            setLoading(true);
            const method = "POST"
            const headers = { Accept: "application/json, text/plain, */*", "Content-Type": "application/json", }
            const body = JSON.stringify({
                senderId: 1,
                reciverMails: [formValue.email],
                subject: formValue.subject,
                mailContent: `
                <h1>Fullname: ${formValue.fullname}</h1>
                </br>
                <p>Phone: ${formValue.phone}</p>
                </br>
                <p>Email: ${formValue.email}</p>
                </br>
                <p>Subject: ${formValue.message}</p>
                `
            })
            let reqOptions = { method, body, headers, };

            // Performing the fetch request
            fetch(`${env.apiDomain}/tools/mailer`, reqOptions)
                .then(res => {
                    setLoading(false);
                    console.log(res);

                    if (res.status === 200) {
                        setAlert({ alert: true, close: true, message: "Email successfully sent" });
                    } else {
                        setAlert({ alert: true, close: true, error: true, message: "Something went wrong" });
                    }
                    // Resetting form and errors after submission
                    setError({ email: "", phone: "", subject: "", message: "", fullname: "" });
                    setFormValue({ email: "", phone: "", subject: "", message: "", fullname: "" });
                })
                .catch(e => console.log(e));
        }
    };


    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {

        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        dispatch({ type: SET_ACTIVELINK_ID, payload: 8 });
        localStorage.setItem("activeLinkId", JSON.stringify(8))
    }, [dispatch])


    return (
        <Layout loggedIn={data}>
            <div className={`page ${styles.page} ${windowDimensions.width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >
                        {alert.alert && <Alert setAlert={setAlert} alert={alert} />}
                        <div className={styles.title_div}>
                            <h1>
                                <span className={styles.contact}>
                                    Contact
                                </span>
                                us
                            </h1>
                        </div>
                        <div className={styles.content_div}>
                            <Address />
                            <Address forMobile={true} />
                            <div className={styles.content_div_right}>
                                <div className={styles.form_box}>
                                    <div className={styles.form_title_wrap}>
                                        <h3 className={styles.title}>
                                            We would love to hear from you
                                        </h3>
                                        <p className={styles.desc}>
                                            Send us a message and we will respond as soon as possible
                                        </p>
                                    </div>
                                    <div className={styles.form_content}>
                                        <form className={styles.form}>
                                            <div className={styles.input_box}>
                                                <div className={styles.input}>
                                                    <TextInput
                                                        label="Full name"
                                                        name="fullname"
                                                        type="text"
                                                        onChange={onChangeHandler}
                                                        value={formValue.fullname}
                                                        errorMessage={!formValue.fullname && error.fullname ? error.fullname : ""}
                                                    />
                                                </div>
                                                <div className={styles.input}>
                                                    <TextInput
                                                        label="Subject"
                                                        name="subject"
                                                        type="text"
                                                        onChange={onChangeHandler}
                                                        value={formValue.subject}
                                                        errorMessage={!formValue.subject && error.subject ? error.subject : ""}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.input_box}>
                                                <div className={styles.input}>
                                                    <TextInput
                                                        label="Email"
                                                        name="email"
                                                        type="text"
                                                        onChange={onChangeHandler}
                                                        value={formValue.email}
                                                        errorMessage={!formValue.email && error.email ? error.email : ""}
                                                    />
                                                </div>
                                                <div className={styles.input}>
                                                    <TextInput
                                                        label="Phone"
                                                        name="phone"
                                                        type="text"
                                                        onChange={onChangeHandler}
                                                        value={formValue.phone}
                                                        errorMessage={!formValue.phone && error.phone ? error.phone : ""}
                                                    />
                                                </div>
                                            </div>
                                        </form>

                                        <div className={`${styles.input} ${styles.inp_textarea}`}>
                                            <TextArea
                                                name="message"
                                                value={formValue.message}
                                                onChange={onChangeHandler}
                                                fromTrDetails={true}
                                                label="Write message"
                                                errorMessage={!formValue.message && error.message ? error.message : ""}
                                            />
                                        </div>
                                        <button onClick={handleSend} className={`btn btn_primary mt_1`}>
                                            {loading ? "Loading" : "Send Message"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default ContactUs;
export async function getServerSideProps({ req, res }) {
    const { cookie } = req.headers;
    const cookies = parseCookies(cookie);

    // Check if the required cookie exists
    const verify = Boolean(cookies["user-id"]);

    if (!verify) {
        // If the cookie doesn't exist, redirect to home page
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    // If the cookie exists, proceed with rendering the page
    return {
        props: {
            data: verify,
        },
    };
}