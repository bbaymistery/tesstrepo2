import React from 'react'
import { capitalizeFirstLetter } from '../../../helpers/letters'
import styles from "./styles.module.scss"
const BreadCrumbTaxiDeal = ({ previousUrl, breadCrumbFrom, breadCrumbTo, direction }) => {

    return (
        <>
            {/* here we use breadcrumb for the url which has two slash (/) */}
            {/* /heathrow/taxi-from-heathrow-to-ascot */}
            {/*/heathrow/taxi-from-ascot-to-heathrow== previousUrl.split("/")[1]  =>  it takes heathrow */}
            {previousUrl?.split("/").length === 3 ?
                <div className={styles.breadcrumb} direction={String(direction === 'rtl')} id="breadcrumb" >
                    <span> <a href="/" title="Airport Pickups London"> Home  </a> <span><i className="fa-solid fa-arrow-right"></i></span></span>
                    <span>
                        <a href={`/${previousUrl?.split("/")[1]}`} title={`${capitalizeFirstLetter(previousUrl?.split("/")[1])} transfers`}>
                            {`${previousUrl?.split("/")[1]}`}
                        </a>
                        <span><i className="fa-solid fa-arrow-right"></i></span>
                    </span>
                    <span>
                        <a href={`${previousUrl}`} title={`${breadCrumbFrom} to ${breadCrumbTo} Taxi`}>
                            {`${breadCrumbFrom} to ${breadCrumbTo} Taxi`}
                        </a>
                    </span>
                </div > : <></>}


            {/* if url contains 3 (/) slashes */}
            {/* /heathrow/london/taxi-to-bayswater */}
            {previousUrl?.split("/").length === 4 ?
                <div className={styles.breadcrumb} direction={String(direction === 'rtl')} id="breadcrumb" >
                    <span> <a href="/" title="Airport Pickups London"> Home  </a> <span><i className="fa-solid fa-arrow-right"></i></span></span>
                    <span>
                        <a href={`/${previousUrl?.split("/")[1]}`} title={`${capitalizeFirstLetter(previousUrl?.split("/")[1])} transfers`}>
                            {`${previousUrl?.split("/")[1]}`}
                        </a>
                        <span><i className="fa-solid fa-arrow-right"></i></span>
                    </span>
                    <span>
                        <a href="/heathrow-london-transfers" title="Heathrow to Central London Taxis">
                            {`${previousUrl?.split("/")[2]}`}
                        </a>
                        <span><i className="fa-solid fa-arrow-right"></i></span>
                    </span>

                    <span>
                        <a href={previousUrl} title="Heathrow to Central London Taxis">
                            {/*taxi-to-bayswater    <it is changed to > taxi-to-bayswater Taxi To Bayswater */}
                            {`${previousUrl?.split("/")[3].split("-").join(" ")} Taxi`}
                        </a>
                    </span>
                </div > : <></>}
        </>
    )
}

export default BreadCrumbTaxiDeal