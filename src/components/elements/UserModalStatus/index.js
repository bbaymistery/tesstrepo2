import React, { useState } from 'react'
import styles from "./styles.module.scss"
import OutsideClickAlert from '../OutsideClickAlert'
import TextInput from '../TextInput'
import Select from '../Select'
const UserModalStatus = (props) => {
    let { showModal = false, closeModal = () => { }, outsideClick = () => { }, title = "", btnText = "", internalState, setInternalState, initializeInternaleState = () => { } } = props

    const [showPass, setshowPass] = useState(false);


    //send request
    const addUser = (par) => {

    }
    const handleShowPass = () => setshowPass(!showPass);
    const onChangeInputHandler = (e) => setInternalState({ [e.target.name]: e.target.value })
    const selectorChangeHandler = (e) => setInternalState({ [e.target.name]: e.target.value })
    const handleCloseModal = (e) => {
        closeModal(false)
    }

    return (
        <>

            {showModal ?
                <div className={`${styles.user_modal_container} zoom_out`}>
                    <OutsideClickAlert onOutsideClick={() => outsideClick()}>
                        <div className={styles.user_modal_content}>

                            <p className={styles.user_modal_content_title}>
                                {title}
                            </p>
                            {/* //todo  =>  take internalstate and map through reduce the length of component*/}
                            {/* //!Username*/}
                            <div className={styles.user_modal_content_input_div}>
                                <TextInput
                                    name={"1"}
                                    type="text"
                                    label="Full Name"
                                    value={internalState["1"]}
                                    onChange={(e) => onChangeInputHandler(e)}
                                    labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}
                                />
                            </div>
                            {/* //!Fullname*/}
                            <div className={styles.user_modal_content_input_div}>
                                <TextInput
                                    name={"2"}
                                    type="text"
                                    label="User Name"
                                    value={internalState["2"]}
                                    onChange={(e) => onChangeInputHandler(e)}
                                    labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}
                                />
                            </div>
                            {/* //!Email*/}
                            <div className={styles.user_modal_content_input_div}>
                                <TextInput
                                    type="text"
                                    name={"3"}
                                    label="User Email"
                                    value={internalState["3"]}
                                    onChange={(e) => onChangeInputHandler(e)}
                                    labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}
                                />
                            </div>
                            {/* //!Password*/}
                            <div className={styles.user_modal_content_input_div}>
                                <TextInput
                                    type={showPass ? "text" : "password"}
                                    name={"10"}
                                    label="Password"
                                    value={internalState["10"]}
                                    onChange={(e) => onChangeInputHandler(e)}
                                    labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}
                                />
                                {!showPass ? (
                                    <i className="fa-solid fa-eye" onClick={handleShowPass}></i>)
                                    : (<i className="fa-solid fa-eye-slash" onClick={handleShowPass}  ></i>)}
                            </div>

                            {/* //!Main Account Name*/}
                            <div className={styles.user_modal_content_input_div}>
                                <TextInput
                                    type={"text"}
                                    name={"4"}
                                    label="Main Account Name"
                                    value={internalState["4"]}
                                    onChange={(e) => onChangeInputHandler(e)}
                                    labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}

                                />

                            </div>
                            {/* //!Agency Name */}
                            <div className={styles.user_modal_content_input_div}>
                                <TextInput
                                    type={"text"}
                                    name={"5"}
                                    label="Agency Name"
                                    value={internalState["5"]}
                                    readOnly={true}
                                    onChange={(e) => onChangeInputHandler(e)}
                                    labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: 500 }}

                                />
                            </div>

                            <div className={styles.user_modal_content_input_div}>
                                <Select
                                    label="User Role"
                                    data={[{ value: "Account Admin", id: "0" }, { value: "Account User", id: "1" }]}
                                    name="6"
                                    onChange={(e) => selectorChangeHandler(e)}
                                    flightSelectOption={true}
                                    labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: "bold !important" }}
                                    value={internalState["5"]}

                                />
                            </div>
                            <div className={styles.user_modal_content_input_div}>
                                <Select
                                    label="Status"
                                    data={[{ value: "Active", id: "0" }, { value: "Passive", id: "1" }]}
                                    name="8"
                                    onChange={(e) => selectorChangeHandler(e)}
                                    value={internalState["8"]}
                                    flightSelectOption={true}
                                    labelStyle={{ color: '#0d233e', fontSize: '14px', fontWeight: "bold !important" }}

                                />
                            </div>
                            <i onClick={handleCloseModal} className={`fa-solid fa-circle-xmark ${styles.user_modal_content_icon}`}></i>


                            <div className={styles.add_new_user_btn_div}>
                                <button onClick={addUser} className='btn btn-primary'>{btnText}</button>
                            </div>
                        </div>
                    </OutsideClickAlert>

                </div> : <></>}
        </>
    )
}

export default UserModalStatus