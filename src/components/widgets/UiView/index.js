import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useWindowSize } from '../../../hooks/useWindowSize';
import ShowContent from './ShowContent';

const UiView = () => {
  const [showText, setshowText] = useState(false)
  let size = useWindowSize()
  let { width } = size

  return (
    <div className={styles.uiView}>
      <div className={styles.container}>
        <div className={styles.features}>
          <div className={styles.feature_box}>
            <div className={styles.thumb}>
              <header className={styles.thumb_header}>
                <i className={`fa-solid fa-thumbs-up ${styles.thumb_icon}`}></i>
              </header>

              <div className={styles.thumb_caption}>
                <h2 className={styles.thumb_title}>
                  Airport meet and greet
                </h2>
                <p className={styles.thumb_desc}>Airport meet and greet</p>
              </div>
            </div>
            <div className={styles.thumb}>
              <header className={styles.thumb_header}>
                <i className={`fa-solid fa-briefcase ${styles.thumb_icon}`}></i>
              </header>
              <div className={styles.thumb_caption}>
                <h2 className={styles.thumb_title}>
                  Free waiting time
                </h2>
                <p className={styles.thumb_desc}>
                  No charge in case <br /> of flight delays
                </p>
              </div>
            </div>
            <div className={styles.thumb}>
              <header className={styles.thumb_header}>
                <i
                  style={{ transform: "rotate(40deg)" }}
                  className={`fa-solid fa-plane-up ${styles.thumb_icon}`}
                ></i>
              </header>
              <div className={styles.thumb_caption}>
                <h2 className={styles.thumb_title}>
                  Flight tracking
                </h2>
                <p className={styles.thumb_desc}>Flight tracking</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.main_content}>
          <p>
            London Heathrow Taxi
            specializes in transfers between central London and all
            terminals at London

            Heathrow Airport. It
            is an affordable and reliable mode of transport to the airport,
            with London Heathrow Taxi
            offering inclusive fares and no hidden charges.

            {showText ? <button onClick={() => setshowText(!showText)}>Hide </button> : <button onClick={() => setshowText(!showText)}>Show More</button>}
          </p>

          {width > 768 ? <ShowContent /> : <></>}
          {showText && width <= 768 ? <ShowContent /> : <></>}
        </div>
      </div>
    </div>
  );
};



export default UiView;