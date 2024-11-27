import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { SET_SELECT_ACTIVE_LINK } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import Layout from "../../components/layouts/Layout";
import TextInput from "../../components/elements/TextInput";
import TextArea from "../../components/elements/TextArea";
import ContentLeft from "./ContentLeft";
import Alert from "../../components/elements/Alert";
import LoadingInput from "../../components/elements/LoadingInput";
import BreadCrumb from "../../components/elements/breadCrubm";

const Contact = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({ email: "", phone: "", subject: "", message: "", fullname: "", });
  const [error, setError] = useState({ email: "", phone: "", subject: "", message: "", fullname: "", });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ alert: false, message: "", close: false, });
  const onchangeHandler = (e) => {
    setFormValue((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleSend = () => {
    if (!formValue.email) {
      setError((error) => ({ ...error, email: "Required" }));
    }
    if (!formValue.phone) {
      setError((error) => ({ ...error, phone: "Required" }));
    }
    if (!formValue.message) {
      setError((error) => ({ ...error, message: "Required" }));
    }
    if (!formValue.subject) {
      setError((error) => ({ ...error, subject: "Required" }));
    }
    if (!formValue.fullname) {
      setError((error) => ({ ...error, fullname: "Required" }));
    }
    if (formValue.email && formValue.phone && formValue.subject && formValue.phone && formValue.message) {
      setLoading(true);
      let reqOptions = {
        method: "POST",
        body: JSON.stringify({ formValue }),
        headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json", },
      };
      fetch("/api/contact_us_email", reqOptions)
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.statusText === "OK") {
            setAlert({ alert: true, close: true, message: "Email successfully sended", });
          } else {
            setAlert({ alert: true, close: true, error: true, message: "Something went wrong ", });
          }

          setError({ email: "", phone: "", subject: "", message: "", fullname: "", });
          setFormValue({ email: "", phone: "", subject: "", message: "", fullname: "", });
        })
        .catch((e) => {
          console.log(e);
          setAlert({ alert: true, close: true, error: true, message: e.message, });
          setLoading(false);
          setAlert({ alert: true, close: true, error: true, message: "Something went wrong ", });
        });

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    dispatch({ type: SET_SELECT_ACTIVE_LINK, payload: "contact", });
  }, []);

  return (
    <Layout
      title="London  Contact London Heathrow Taxi"
      keywords="Heathrow taxi contact"
      description="Contact  London Heathrow taxi service. "
      noFooter={false}
      noTopbar={true}
    >
      <div className={`page ${styles.contact_page}`}>
        <BreadCrumb title="" />
        <div className={`page_section ${styles.contact_page_section}`}>
          <div className={` ${styles.contact_page_section_container}`}>
            {alert.alert ? (
              <Alert
                setAlert={setAlert}
                alert={alert}
                message={alert.message}
                close={alert.close}
                error={alert.error}
                warning={alert.warning}
              />
            ) : (
              ""
            )}
            <div className={styles.form_content}>
              <ContentLeft />
              <div className={styles.form_content_right}>
                <div className={styles.form_content_right_title}>
                  Send a Message
                </div>

                <form action="" className={styles.form}>
                  <div className={styles.form_left}>
                    <div className={styles.inp_div}>
                      <TextInput
                        name="fullname"
                        type="text"
                        animationInput={true}
                        contactUs={true}
                        title="Full Name"
                        value={formValue.fullname}
                        onChange={(e) => onchangeHandler(e)}
                        errorMessage={
                          !formValue.fullname && error.fullname
                            ? error.fullname
                            : ""
                        }
                      />
                    </div>
                    <div className={styles.inp_div}>
                      <TextInput
                        name="email"
                        type="text"
                        contactUs={true}
                        animationInput={true}
                        title="Email Address"
                        value={formValue.email}
                        onChange={(e) => onchangeHandler(e)}
                        errorMessage={
                          !formValue.email && error.email ? error.email : ""
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.form_right}>
                    <div className={styles.inp_div}>
                      <TextInput
                        name="phone"
                        type="text"
                        contactUs={true}
                        animationInput={true}
                        title="Phone"
                        onChange={(e) => onchangeHandler(e)}
                        value={formValue.phone}
                        errorMessage={
                          !formValue.phone && error.phone ? error.phone : ""
                        }
                      />
                    </div>
                    <div className={styles.inp_div}>
                      <TextInput
                        name="subject"
                        type="text"
                        animationInput={true}
                        contactUs={true}
                        title="Subject"
                        onChange={(e) => onchangeHandler(e)}
                        value={formValue.subject}
                        errorMessage={
                          !formValue.subject && error.subject
                            ? error.subject
                            : ""
                        }
                      />
                    </div>
                  </div>
                </form>
                <div className={styles.special_div}>
                  <TextArea
                    name="message"
                    animationTextarea={true}
                    title="Write Your Message Here"
                    onChange={(e) => onchangeHandler(e)}
                    value={formValue.message}
                    errorMessage={
                      !formValue.message && error.message ? error.message : ""
                    }
                  />
                </div>

                <div className={styles.btn_div}>
                  <button onClick={handleSend}>
                    {loading ? <LoadingInput /> : "SEND"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
