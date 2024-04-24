import { useDispatch, useSelector } from 'react-redux'
import styles from "./toast.module.scss"

const Toast = ({ title, body, bgColor }) => {
    const dispatch = useDispatch()
    const handleClose = () => dispatch({ type: "ALERT", payload: {} })
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { direction } } = state
    return (
        // style={{ top: '5px', right: '5px', zIndex: 50, minWidth: '200px' }}
        //
        <div className={`${styles.toast_notification} ${direction} ${styles.fade_bottom_to_top_hidden}  ${bgColor}`} style={{ zIndex: 50, minWidth: '200px' }}>
            <div className={` ${styles.toast_nofication_header}  ${bgColor}`}>
                <strong >{title}</strong>
                <i onClick={handleClose} className={`fa-solid fa-x ${styles.close_icon}`}></i>
            </div>
            <div className={styles.toast_notification_body}>
                {typeof (body) === 'string' ? body : <ul>{body.map((text, index) => (<li key={index}>{text}</li>))} </ul>}
            </div>
        </div>
    )
}

export default Toast