import React from 'react'
import styles from "./styles.module.scss"
const ReusableModal = ({ shouldShowModal = false, onRequestClose = () => { }, children, style, showModalCloseIcon = true }) => {
    return shouldShowModal ? (
        <div onClick={onRequestClose} className={styles.modal} style={style}>
            <div className={styles.modal_body} onClick={e => e.stopPropagation()}>
                {showModalCloseIcon ? <i onClick={onRequestClose} className={`fa-solid fa-xmark ${styles.hide_modal_icon}`}></i> : <></>}
                {children}
            </div>
        </div>
    ) : <></>
}

export default ReusableModal