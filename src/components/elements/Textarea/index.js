import React from 'react'
import { useSelector } from 'react-redux';
import styles from "./styles.module.scss";
/**
 @TextInput {//* name:string,label:string,errorMessage:string,value:string,onChange:function}
 **/
const Textarea = (props) => {
    let { name = "", label = "", errorMessage = "", value = "", onChange = (e) => { }, isTaxiDeal = false ,inputStyle={},labelStyle={}} = props
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { direction } } = state
    return (
        <section className={`${styles.form_input} ${isTaxiDeal ? styles.isTaxiDeal : ""}`}>
            {errorMessage ? <p direction={String(direction === 'rtl')} className={`error_message ${styles.form_input_error}`}>{errorMessage}</p> : <React.Fragment></React.Fragment>}
            <textarea  style={{...inputStyle}} value={value} name={name} onChange={onChange} className={`${styles.textarea} `} err={String(typeof errorMessage === 'string' && errorMessage.length > 0)} />
            <label  style={{ ...labelStyle}} htmlFor={name} className={styles.label}> {label} </label>
        </section>
    )
}

export default Textarea