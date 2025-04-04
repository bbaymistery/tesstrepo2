import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout';
import { getWindowDimensions } from '../../helpers/windowDimension';
import styles from "./styles.module.scss"
import TextInput from '../../components/elements/TextInput';
import TextArea from '../../components/elements/Textarea';
import NoLogImage from '../../../public/images/no-logo.jpg';
import Image from 'next/image';
import AdressInformations from '../../components/elements/AdressInformations';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
const EditProfile = ({ data }) => {

    let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
        'accountName': "",
        'postcode': '',
        "website": "",
        "adress": "",
        "contactName": "",
        "contactEmail": "",
        "jobTitle": "",
        "phone": "",
        "logo": "",
        // operation Notes
        "urgentSituationNumber": "",
        "accountPassengerStatus": "Account",
        "urgentSituationStatus": "No"
    })

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const onChangeInputHandler = (e) => {
        if (e.target.name === 'logo') {
            setInternalState({ [e.target.name]: e.target.files[0] })
        } else {
            setInternalState({ [e.target.name]: e.target.value })
        }
    }
    const handleOnChangeNumberInput = (params = {}) => {
        let { value, name, } = params
        setInternalState({ [name]: value })
    }
    const onChangeCheckBoxHandler = (e) => setInternalState({ [e.target.name]: e.target.value })
    const gotoNextPage = () => {

        // send request to api
        //..
    }

    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <Layout loggedIn={data}>
            <div className={`page ${styles.editprofile} ${windowDimensions.width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.editprofile_section} `}  >
                    <div className={`page_section_container ${styles.editprofile_section_container} `} >
                        <div className={styles.title_div}>
                            <h1>Edit Account</h1>
                        </div>
                        <div className={styles.editprofile_content}>
                            {/* left */}
                            <div className={styles.editprofile_content_left}>
                                {/* //! Account Details */}
                                <div className={styles.details_div}>
                                    <h1>Account Details</h1>
                                    <div className={`${styles.details}  `}>
                                        <div className={styles.input_div}>
                                            <TextInput
                                                label="Account Name"
                                                type="text"
                                                name={"accountName"}
                                                value={internalState["accountName"]}
                                                onChange={(e) => onChangeInputHandler(e)}
                                                bookingHistoy={true}
                                                labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}
                                            />
                                        </div>
                                        <div className={styles.input_div}>
                                            <TextInput
                                                label="Postcode"
                                                type="text"
                                                name={"postcode"}
                                                value={internalState["postcode"]}
                                                onChange={(e) => onChangeInputHandler(e)}
                                                bookingHistoy={true}
                                                labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}
                                            />
                                        </div>
                                        <div className={styles.input_div}>
                                            <TextInput
                                                label="Website"
                                                type="text"
                                                name={"website"}
                                                value={internalState["website"]}
                                                onChange={(e) => onChangeInputHandler(e)}
                                                bookingHistoy={true}
                                                labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}
                                            />
                                        </div>


                                        <div className={styles.input_div}>
                                            <TextArea
                                                label="Adress"
                                                type="text"
                                                name={"adress"}
                                                value={internalState["adress"]}
                                                onChange={(e) => onChangeInputHandler(e)}
                                                bookingHistoy={true}
                                                labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}
                                            />
                                        </div>


                                    </div>
                                </div>
                                {/* //!contat details */}
                                <div className={styles.details_div}>

                                    <h1>Contact Details</h1>

                                    <div className={`${styles.details} `}>
                                        <div className={styles.input_div}>
                                            <TextInput
                                                label="Contact Name"
                                                type="text"
                                                name={"contactName"}
                                                value={internalState["contactName"]}
                                                onChange={(e) => onChangeInputHandler(e)}
                                                bookingHistoy={true}
                                                labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}

                                            />
                                        </div>
                                        <div className={styles.input_div}>
                                            <TextInput
                                                label="Contact Email"
                                                type="text"
                                                name={"contactEmail"}
                                                value={internalState["contactEmail"]}
                                                onChange={(e) => onChangeInputHandler(e)}
                                                bookingHistoy={true}
                                                labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}

                                            />
                                        </div>
                                        <div className={styles.input_div}>
                                            <TextInput
                                                label="Job Title"
                                                type="text"
                                                name={"jobTitle"}
                                                value={internalState["jobTitle"]}
                                                onChange={(e) => onChangeInputHandler(e)}
                                                bookingHistoy={true}
                                                labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}

                                            />
                                        </div>

                                        <div className={styles.input_div}>
                                            <PhoneInput
                                                className={`phone_input`}
                                                value={internalState["phone"]}
                                                onChange={(value, selectedCountry) => handleOnChangeNumberInput({ value, selectedCountry, name: "phone" })}
                                                country="gb"
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                    // style: { border: errorHolder?.accountRegisterDatas?.applicantForCreditAccount?.companyTel ? '1px solid red' : ' 1px solid #ced4da' }
                                                }}

                                            />
                                        </div>

                                        <div className={`${styles.input_div} ${styles.last_input_item}`}>
                                            <p className={styles.input_image_title}>Logo</p>
                                            <div className={` ${styles.input_div_top}`}>
                                                <div className={styles.input_div_top_buttons}>
                                                    <div>
                                                        <input type="file" id="myFileInput" name="logo" onChange={onChangeInputHandler} />
                                                        <label htmlFor="myFileInput" className={styles.fileLabel}>Choose a file</label>
                                                        <br />
                                                        {/* <label htmlFor="myFileInput" className={styles.fileLabel}>Choose a file</label> */}
                                                        {internalState["logo"] ? <button disabled={!internalState["logo"]} onClick={() => setInternalState({ ["logo"]: "", })}>Remove a file</button> : <></>}
                                                    </div>
                                                    <div className={styles.image_content_div}>
                                                        <Image width={"60%"} height={"50px"} alt="not found" src={internalState["logo"] ? URL.createObjectURL(internalState["logo"]) : NoLogImage} />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>



                                    </div>
                                </div>
                                {/* //!Operation notes */}
                                <div className={styles.details_div}>
                                    <h1>Operation Notes</h1>
                                    <div className={`${styles.details} ${styles.operation_details}`}>
                                        <div className={`${styles.input_div} ${styles.the_checkbox_div}`}>
                                            <p>Do you have any out-of-hours emergency number for urgent situations?</p>
                                            <div className={styles.radio_input_content}>
                                                <div>
                                                    <input onChange={(e) => onChangeCheckBoxHandler(e)} defaultChecked={internalState["urgentSituationStatus"] === 'Yes'} type="radio" id="UrgentSituationYes" name="urgentSituationStatus" value="Yes" />
                                                    <label htmlFor="UrgentSituationYes">Yes</label><br />
                                                </div>

                                                <div>
                                                    <input onChange={(e) => onChangeCheckBoxHandler(e)} defaultChecked={internalState["urgentSituationStatus"] === 'No'} type="radio" id="UrgentSituationNo" name="urgentSituationStatus" value={"No"} />
                                                    <label htmlFor="UrgentSituationNo">No</label><br />
                                                </div>
                                            </div>
                                            {internalState["urgentSituationStatus"] === 'No' ?
                                                <div className={styles.input_div}>
                                                    <PhoneInput
                                                        className={`phone_input `}
                                                        value={internalState["urgentSituationNumber"]}
                                                        onChange={(value, selectedCountry) => handleOnChangeNumberInput({ value, selectedCountry, name: "urgentSituationNumber" })}
                                                        country="gb"
                                                        inputProps={{
                                                            name: 'urgentSituationNumber',
                                                            required: true,
                                                            // style: { border: errorHolder?.accountRegisterDatas?.operationNotes?.urgentSituationNumber ? '1px solid red' : ' 1px solid #ced4da' }
                                                        }}
                                                    />
                                                </div>
                                                : <></>}
                                        </div>
                                        <div className={`${styles.input_div} ${styles.the_checkbox_div}`}>
                                            <p>In case of extra payment for airport transfers, who pays for the extras?</p>
                                            <div className={styles.radio_input_content}>
                                                <div>
                                                    <input onChange={(e) => onChangeCheckBoxHandler(e)} defaultChecked={internalState["accountPassengerStatus"] === 'Account'} type="radio" id="Account" name="accountPassengerStatus" value={"Account"} />
                                                    <label htmlFor="Account">Account</label><br />
                                                </div>
                                                <div>
                                                    <input onChange={(e) => onChangeCheckBoxHandler(e)} defaultChecked={internalState["accountPassengerStatus"] === 'Passenger'} type="radio" id="Passenger" name="accountPassengerStatus" value={"Passenger"} />
                                                    <label htmlFor="Passenger">Passenger</label><br />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles.input_div} ${styles.last_input_item}`} >


                                            <TextArea
                                                label="Operation comments"
                                                name="operationComments"
                                                // onChange={(e) => onchangeHandler(e, 0, 0)}
                                                value={""}
                                                errorMessage={""}
                                                bookingHistoy={true}
                                                labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}

                                            />
                                        </div>
                                    </div>
                                    <div className={styles.edit_btn_div}>
                                        <button className='btn btn-primary'>Edit Account</button>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.editprofile_content_registration_right}>
                                <AdressInformations />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default EditProfile;
export async function getServerSideProps({ req, res }) {
    let verify = req.cookies["user-id"];

    return {
        props: {
            data: verify,
        },
    };
}