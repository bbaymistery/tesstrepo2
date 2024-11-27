import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"

/**
 * A React component that renders a text input field with a label and optional error message.
 * 
 * @param {object} props - The component props.
 * @param {string} [props.type="text"] - The type of the input field (e.g. "text", "email", "password").
 * @param {string} [props.value=""] - The value of the input field.
 * @param {string} [props.name=""] - The name of the input field.
 * @param {string} [props.label=""] - The label for the input field.
 * @param {string} [props.errorMessage] - An optional error message to display below the input field.
 * @param {function} [props.onChange=(e) => {}] - A callback function to be called when the input value changes.
 * @param {string} [props.placeholder=""] - The placeholder text for the input field.
 * @param {object} [props.labelStyle={}] - Additional styles to apply to the label element.
 * @param {object} [props.inputStyle={}] - Additional styles to apply to the input element.
 */
const TextInput = (props) => {
  
  let { type = "text", value = "", name = "", label = "", errorMessage, onChange = (e) => { }, placeholder = "", labelStyle={},inputStyle={}} = props
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { direction } } = state
  return (
    <section className={styles.form_input} >
      {typeof errorMessage === 'string' ? <p direction={String(direction === 'rtl')} className={`error_message ${styles.form_input_error}`}>{errorMessage}</p> : <React.Fragment></React.Fragment>}
      <input style={{...inputStyle}} required err={String(typeof errorMessage === 'string' && errorMessage.length > 0)} type={type} value={value} name={name} onChange={onChange} placeholder={placeholder} className={`${styles.input}`} />
      <label style={{ ...labelStyle}} htmlFor={name} className={styles.label}> {label} </label>
    </section>
  )
}

export default TextInput