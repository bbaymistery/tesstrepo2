import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout';
import CarsSlider from "../../components/widgets/CarsSlider";
import DestinationsCustomers from '../../components/elements/DestinationsCustomers';
const DriversWanted = () => {
  const state = useSelector(state => state.pickUpDropOffActions)
  let { params: { direction } } = state

  let keywords = "", metaTitle = "", description = ""
  return (
    <GlobalLayout keywords={keywords} title={metaTitle} description={description} footerbggray={true}>
      <div className={`${styles.driverswanted} ${direction} page`}>
        <div className={`${styles.driverswanted_section} page_section`}>
          <div className={`${styles.driverswanted_section_container} page_section_container`}>
            <div className={styles.content}>

              <div className={styles.left}>
                <h1>Become an APL Driver</h1>
                <p>
                  Join our growing team of professional drivers at APL Cars. We are currently accepting applications for MPV, SUV, and 8-seater vehicles. Additionally, we are accepting applications for Business Class saloon vehicles such as Mercedes, BMW, Tesla, and Jaguar.
                </p>
                <h2>
                  Driver Registration
                </h2>
                <p>
                  To register, please follow these steps:
                </p>
                <p>
                  1. Download our APL Driver App:
                  <ul>
                    <li>
                      2.     Fill out the driver registration form in the app.
                    </li>
                    <li>
                      3.   After completing the registration process, visit our office at APL Office, Novotel Cherry Lane, UB7 9HJ (FREE parking).
                    </li>
                  </ul>
                </p>
                <h2>APL Driver App</h2>


                <div className={styles.ios_android_div}>
                  <p> For Iphone: please click on the link below</p>
                  <a href="https://apps.apple.com/gb/app/apl-drivers/id1661484765">
                    <div>
                      <img src="images/others/iosicon.png" alt="Aiport pickups-london ios-icon" />
                      <p>APL Drivers<br /></p>
                    </div>
                  </a>
                </div>
                <p>Go to Settings / Privacy / Location Services, APL / Allow Location Always.</p>

                &nbsp;
                <div className={styles.ios_android_div}>
                  <p> For Android Phones: Please click on the link below or download from Google PLAY Store</p>
                  <a href="https://apps.apple.com/gb/app/apl-drivers/id1661484765">
                    <div>
                      <img src="images/others/androidicon.png" alt="Aiport pickups-london ios-icon" />
                      <p>APL Drivers<br /></p>
                    </div>
                  </a>
                </div>
                <p>After installation is completed, accept notifications and location permissions.</p>
                &nbsp;

                <h2>APL Name Board App</h2>
                <p>Please download our APL Name Board App for an improved pickup experience:</p>
                <p>For iOS devices: Download from the <a href="https://apps.apple.com">App Store</a> : APL Nameboard</p>
                <p>For Android devices: Download from <a href="https://play.google.com">Google Play</a> : APL Nameboard</p>
                <p>Join our team today and start your journey towards a rewarding and successful driving career with APL!</p>
              </div>


              <div className={styles.right}>
                <div className={styles.img_div}>
                  <img src="/images/others/driversAPP.png" alt="Aiport pickups-london drivers-app" />
                </div>
              </div>
            </div>
            <DestinationsCustomers />
            <CarsSlider noborder={true} />

          </div>

        </div>
      </div>
    </GlobalLayout >
  )
}

export default DriversWanted



