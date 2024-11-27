import React from "react";
import styles from "./styles.module.scss";

const HeroCarIcon = () => {
    return (
        <div className={styles.carIcon}>
            <ul className={styles.section_tab}>
                <li className={styles.navItem}>
                    {/* aria-label kullanarak ikonun bağlantı metnini ekleyin */}
                    <a href="/" className={styles.navLink} aria-label="Transfer Search">
                        {/* İkon için alternatif metin olarak title kullanılıyor */}
                        <i className={`fa-solid fa-car-rear ${styles.icon}  `}></i>
                        <span> Transfer Search</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default HeroCarIcon;
