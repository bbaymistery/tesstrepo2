import React from 'react'
import styles from "./resultBox.module.scss";
import Image from 'next/image';
import LoadingInput from '../LoadingInput';
import dynamic from "next/dynamic";
const HandleSearchResults = dynamic(() => import("../HandleSearchResults"))

const ResultBox = ({ showInputFieldPickUpIndex, index, internalState, pickInputsUpValue, loadingPickUpOneWay, setFocusToInput, onchangeHandler, closeModal }) => {
    return (
        <div className={`${styles.result_box} `} >
            {showInputFieldPickUpIndex === index && (
                <div className={`${styles['search-input-container']} ${styles.search_box}`} f={String(internalState[`pickup-search-focus-${index}`])} id="content">
                    <div className={styles.popup_header} f={String(internalState[`pickup-search-focus-${index}`])}>
                        <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "pickup" })}></i>

                        <p>From ?</p>
                    </div>

                    <div className={styles.search_box_input_div}>
                        <input
                            id="input_focused"
                            autoFocus
                            type="text"
                            value={pickInputsUpValue[index].value}
                            name="pickupOneway"
                            onChange={(e) => onchangeHandler(e, index, 0, 0)}
                            onFocus={e => setFocusToInput({ e, destination: "pickup", index })}
                            f={String(internalState[`pickup-search-focus-${index}`])} //giving a style if we focused
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                        {loadingPickUpOneWay && (<div className={styles.loading_div}> <LoadingInput /></div>)}
                    </div>
                    {pickInputsUpValue[index].value.length <= 2 && (<p className={styles.explanation}>  Please write Airport ,Hotel or Full Post Code  </p>)}

                    {pickInputsUpValue[index].value.length > 2 && !loadingPickUpOneWay && (<HandleSearchResults pickOrDrop={"pickupPoints"} journeyType={0} indexOfInputField={index} />)}
                </div>
            )}
        </div>
    )
}

export default ResultBox