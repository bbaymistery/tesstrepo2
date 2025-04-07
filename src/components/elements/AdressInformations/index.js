import React from 'react'
import styles from "./styles.module.scss"
const AdressInformations = () => {
    return (
        <div className={styles.right}>
            <div className={styles.form_box}>
                <div className={styles.form_title_wrap}>
                    <div className={styles.form_title_wrap}>
                        <h3 className={styles.title}> Contact Us</h3>
                    </div>

                    <div className={styles.form_content}>
                        <div className={styles.address_book}>
                            <ul tabIndex="-1">
                                <li tabIndex="-1">
                                    <i className="fa-solid fa-phone"></i>
                                    <h5 className="title font-size-16 pb-1">24/7 Contact</h5>
                                    <a href="tel:+02086887744">0 208 688 7744</a>
                                </li>
                                <li tabIndex="-1">
                                    <i className="fa-solid fa-globe"></i>
                                    <h5 className="title font-size-16 pb-1">From Abroad</h5>
                                    <a href="tel:+442086887744" >+44 208 6887744</a>
                                </li>
                                <li tabIndex="-1">
                                    <i className="fa-brands fa-whatsapp"></i>
                                    <h5 className="title font-size-16 pb-1">  WhatsApp Us</h5>
                                    <a rel="noreferrer" tabIndex="-1" target="_blank" href="https://wa.me/447387901028">
                                        +44 73 8790 1028
                                    </a>
                                </li>


                                <li tabIndex="-1">
                                    <i className="fa-solid fa-envelope"></i>
                                    <h5 className="title font-size-16 pb-1">Email Us</h5>
                                    <a href="mailto: info@aplcars.com"> info@aplcars.com</a>
                                </li>


                                <li>
                                    <i className="fa-solid fa-briefcase"></i>
                                    <h5 className="title font-size-16 pb-1">Account Department</h5>
                                    <a href="mailto: accounts@aplcars.com"> accounts@aplcars.com</a>
                                </li>

                                <li>
                                    <i className="fa-solid fa-building-user"></i>
                                    <h5 className="title font-size-16 pb-1"> Corporate Account Manager</h5>
                                    <p>
                                        <span>  Mr. Oliver Derek</span>
                                        <br />
                                        <a href="mailto: oliver@aplcars.com"> oliver@aplcars.com</a>
                                    </p>
                                </li>
                                <li>
                                    <i className="fa-solid fa-users"></i>
                                    <h5 className="title font-size-16 pb-1">Webmaster Team</h5>
                                    <a href="mailto: web@aplcars.com"> web@aplcars.com</a>
                                </li>


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdressInformations