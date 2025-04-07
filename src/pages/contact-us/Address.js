import React from "react";
import styles from "./styles.module.scss";
const Address = ({ forMobile }) => {
    return (
        <>
            {forMobile ? (
                <div className={`${styles.mobile_left}`}>
                    <ul>
                        <li>
                            <i className="fa-solid fa-location-dot"></i>
                            <h5 className="title font-size-16 pb-1">Address</h5>
                            <p className="map__desc">
                                Office Address:
                                Airport Pickups London
                                APL Office
                                Novotel Hotel M4J4
                                Cherr Lane
                                London
                                UB7 9HJ
                            </p>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <h5 className="title font-size-16 pb-1">Phone</h5>
                            <p className="map__desc">+44 (0) 20 8688 7744</p>
                        </li>

                        <li>
                            <i className="fa-solid fa-print"></i>
                            <h5 className="title font-size-16 pb-1">Fax</h5>
                            <p className="map__desc">+44 (0) 20 8683 2330</p>
                        </li>

                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <h5 className="title font-size-16 pb-1">Email</h5>
                            <p className="map__desc">info@aplcars.com</p>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className={`${styles.content_div_left}`}>
                    <ul>
                        <li>
                            <i className="fa-solid fa-location-dot"></i>
                            <h5 className="title font-size-16 pb-1">Address</h5>
                            <p className="map__desc">
                                Office Address:
                                Airport Pickups London
                                APL Office
                                Novotel Hotel M4J4
                                Cherr Lane
                                London
                                UB7 9HJ
                            </p>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <h5 className="title font-size-16 pb-1">Phone</h5>
                            <p className="map__desc">+44 (0) 20 8688 7744</p>
                        </li>

                        <li>
                            <i className="fa-solid fa-print"></i>
                            <h5 className="title font-size-16 pb-1">Fax</h5>
                            <p className="map__desc">+44 (0) 20 8683 2330</p>
                        </li>

                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <h5 className="title font-size-16 pb-1">Email</h5>
                            <p className="map__desc">info@aplcars.com</p>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Address;