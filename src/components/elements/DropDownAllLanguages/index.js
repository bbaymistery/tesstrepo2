import React from 'react'
import styles from "./styles.module.scss"
import Image from 'next/image'
import { useSelector } from 'react-redux'
const DropDownAllLanguages = ({ languageStatus, handleLanguage }) => {
    const { appData } = useSelector(state => state.initialReducer)

    return (
        <div className={styles.all_languages} style={{ opacity: `${languageStatus ? 1 : 0}`, visibility: `${languageStatus ? "visible" : "hidden"}` }} >
            {appData?.languages.map((item, index) => {
                let { innerText: text, value: key, dir: direction } = item
                return (
                    <div className={styles.content} name={key} key={index} onClick={(e) => handleLanguage({ e, text, key, direction, index })}>
                        <div className={styles.img_div}>
                            <Image src={`/languages/${key}.gif`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" alt={text} />
                        </div>
                        <span>{text}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default DropDownAllLanguages