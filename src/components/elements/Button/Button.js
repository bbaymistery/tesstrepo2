import React from 'react'
import styles from "./styles.module.scss"
import { BUTTON_TYPES } from './ButtonTypes'

/**
 @Button { type:string, btnText:string, icon:component, iconPos:string, style:object, onBtnClick:function}
 **/

const Button = (props) => {
    let { type, btnText, icon, iconPos, style, onBtnClick = () => { } } = props
    const getButtonClass = () => {
        switch (type) {
            case BUTTON_TYPES.PRIMARY:
                return `${styles['btn-primary']} ${styles.button}`;
            case BUTTON_TYPES.PRIMARY_OUTLINE:
                return `${styles['btn-primary-outline']} ${styles.button}`;
            case BUTTON_TYPES.SECONDARY:
                return `${styles['btn-secondary']} ${styles.button}`;
            default:
                return `${styles['btn-tertiary']} ${styles.button}`;
        }
    }
    return (
        <button onClick={onBtnClick} style={style} className={`${getButtonClass()}`} >
            {icon && iconPos === 'LEFT' && icon}
            {btnText}
            {icon && iconPos === 'RIGHT' && icon}
        </button>
    )
}

export default Button