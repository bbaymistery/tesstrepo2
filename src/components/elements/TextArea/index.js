import React from 'react'
import { useSelector } from 'react-redux';
import styles from "./styles.module.scss";

/**
 * A React component that renders a textarea input field with a label and optional error message.
 * 
 * @param {object} props - The component props.
 * @param {string} props.name - The name of the textarea input field.
 * @param {string} props.label - The label text for the textarea input field.
 * @param {string} props.errorMessage - The error message to display if there is an error.
 * @param {string} props.value - The value of the textarea input field.
 * @param {function} props.onChange - The function to call when the textarea input field value changes.
 * @param {boolean} props.isTaxiDeal - A flag indicating whether the textarea is part of a taxi deal.
 * @param {object} props.inputStyle - Additional styles to apply to the textarea input field.
 * @param {object} props.labelStyle - Additional styles to apply to the label.
 */
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