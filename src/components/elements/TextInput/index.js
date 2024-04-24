import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
/**
 @TextInput {//* type:string,name:string,label:string,errorMessage:string,value:string,onChange:function}
 **/
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