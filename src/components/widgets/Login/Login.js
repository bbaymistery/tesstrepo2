import { useState } from "react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Alert from "../../elements/Alert";
import styles from "./styles.module.scss";
import TextInput from "../../elements/TextInput";
import CircleLoading from "../../elements/Loadings/CircleLoading";
import { clearErrors, login } from "../../../store/authReducer/authAction";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import logoImage1 from '../../../../public/logos/noBgLogo.png'
import Recaptcha from '../../components/elements/Recaptcha'

const Login = () => {
  const { loading, isAuthenticated, error } = useSelector((state) => state.authReducer);
  // const [handleInputs, setHandleInputs] = useState({ email: "demo@aplcars.com", pass: "Miranuras20092021", });//1q2w3e
  const [handleInputs, setHandleInputs] = useState({ email: "", pass: "", });//1q2w3e
  // pass: "Miranuras20092021",
  const [alert, setAlert] = useState({ alert: false, message: "", close: false, });
  const [showPass, setshowPass] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [recaptchaToken, setRecapthcaToken] = useState(null);

  const onchangeHandler = (e) => setHandleInputs((values) => ({ ...values, [e.target.name]: e.target.value, }));
  console.log({ recaptchaToken });


  const handleShowPass = () => setshowPass(!showPass);
  //!add email checker
  const handleSend = () => {
    if (alert.alert) return; //in order to prevent multiplce click from client side

    if (!handleInputs.pass || !handleInputs.email || !handleInputs.email.includes("@")) {
      setAlert({ alert: true, close: true, message: "Invalid Email Or Password", error: true, });
    } else {
      dispatch(login(handleInputs.email, handleInputs.pass, router,recaptchaToken,setAlert));
    }
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      setAlert({ alert: true, close: true, message: error, error: true, });
    }

  }, [dispatch, error, alert, isAuthenticated]);


  // Update the token state when the verification is successful
  const handleRecaptchaVerify = (newToken) => setRecapthcaToken(newToken)
  console.log({ recaptchaToken ,a:"Agency"});


  return (
    <div className={` ${styles.agency}`}>
      {alert.alert && (
        <Alert
          setAlert={setAlert}
          alert={alert}
          message={alert.message}
          close={alert.close}
          error={alert.error}
          warning={alert.warning}
        />
      )}
      <div className={`${styles.agency_section}`}>
        <div className={`${styles.agency_section_container}`}>
          <div className={styles.login_box}>
            <div className={styles.login_box_header}>
              <Image src={logoImage1} alt="Airport-pickups-london Logo" width={300} height={35} priority />
            </div>
            <div className={styles.inputs}>
              <div className={styles.login_box_input}>
                <TextInput
                  label="Email or Username"
                  type="text"
                  name="email"
                  onChange={onchangeHandler}
                  value={handleInputs.email}
                  labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}

                />
              </div>
              <div className={styles.login_box_input}>
                <TextInput
                  label="Password"
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  name="pass"
                  onChange={onchangeHandler}
                  value={handleInputs.pass}
                  labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}

                />
                {!showPass ? (
                  <i className="fa-solid fa-eye" onClick={handleShowPass}></i>)
                  : (<i className="fa-solid fa-eye-slash" onClick={handleShowPass}  ></i>)}
              </div>
              <div className={styles.recaptcha}>
                <Recaptcha onVerify={handleRecaptchaVerify} />
              </div>


              <button onClick={handleSend} disabled={alert.alert} className={`btn btn_primary flex-center  ${alert.alert ? "no_pointer" : ""}`}   >
                {loading ? <CircleLoading /> : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
