import React, { useState } from 'react'
import styles from "./styles.module.scss"
import OutsideClickAlert from '../OutsideClickAlert'
const DropDown = (props) => {
  const { label = "", selectedOption, setSelectedOption, options, heading = "", disable = false, headingStyle = {}, dropdownComponentStyle = {}, } = props

  const [isOptionsVisible, setIsOptionsVisible] = useState(false)

  const handleSelected = (option) => {
    setSelectedOption(option)
    setIsOptionsVisible(false)
  }

  return (
    <div className={styles.dropdown}>
      {heading ? <div className={styles.heading} style={headingStyle}>{heading}</div> : <></>}
      {label ? <div className={styles.dropdown_label}>{label}</div> : <></>}
      <OutsideClickAlert onOutsideClick={() => setIsOptionsVisible(false)}>
        <div className={styles.dropdown_component} onClick={() => setIsOptionsVisible(!isOptionsVisible)} disable={String(disable)} style={dropdownComponentStyle}>
          <div className={styles.selected_options_wrapper} >
            <div>{selectedOption}</div>
            {!disable && !isOptionsVisible ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
          </div>

          {!disable && isOptionsVisible ?
            <div className={styles.dropdown_options}>
              {options.length &&
                options.map((option, index) => <div onClick={() => handleSelected(option)} className={styles.dropdown_option} key={index}>{option}</div>)
              }
            </div>
            : <></>}
        </div>
      </OutsideClickAlert>
    </div>
  )
}

export default DropDown