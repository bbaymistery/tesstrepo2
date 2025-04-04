import React from 'react'
import OutsideClickAlert from '../OutsideClickAlert'
import styles from "./styles.module.scss"
const TableVisibilityModal = (props) => {
    let { outsideClick, setShowHideColumns, showHideColumns, handleInputChecking, columns, resetColumns } = props
    return showHideColumns ?
        <div className={`${styles.show_hide_modal_columns_div} zoom_out`}>
            <OutsideClickAlert onOutsideClick={() => outsideClick()}>
                <div className={styles.show_hide_columns_content}>
                    <ul>
                        {columns.map((col) => {
                            return <li key={col.id}>
                                <label>
                                    <input type="checkbox" defaultChecked={col.checked} onClick={(e) => handleInputChecking(e, col.id)} />
                                    <span>{col.val}</span>
                                </label>
                            </li>
                        })}
                    </ul>
                    <div className={styles.show_hide_modal_columns_buttons_div}>
                        <button className='btn btn_primary' onClick={() => setShowHideColumns(false)}>Hide</button>
                        <button className='btn btn_primary' onClick={resetColumns} >Reset</button>
                    </div>
                </div>
            </OutsideClickAlert>
        </div>
        : <></>
}

export default TableVisibilityModal