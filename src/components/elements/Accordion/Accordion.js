import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
const Accordion = ({ title, content, toggleState, active, dangerouslyHtml = false, key }) => {
  const [heightEl, setHeightEl] = useState();
  const refHeight = useRef();
  //elave onu Acilan moment asagida boslug yaransin diye ekledik
  useEffect(() => { setHeightEl(`${refHeight.current.scrollHeight + 10}px`) }, []);

  return (
    <div className={styles.accordion} key={key}>
      <div className={styles.accordion_heading} >
        <div className={styles.accordion_heading_content} onClick={() => toggleState(title)}    >
          <p className={styles.head_title}>{title}</p>
          <span className={`${styles.headClick} ${active === title ? styles.turnUp : ""}`} onClick={() => toggleState(title)}   >
            <i className="fa-solid fa-angle-down"></i>
          </span>
        </div>
      </div>

      {/* //!content */}
      <div className={active === title ? `${styles.accordion_toggle} ${styles.animated}` : `${styles.accordion_toggle}`} style={{ height: active === title ? `${heightEl}` : "0px" }} ref={refHeight}>
        {dangerouslyHtml
          ? content?.map((c, i) => <p key={c.id} dangerouslySetInnerHTML={{ __html: c }}></p>)
          : content?.map((c, i) => <p key={c.id}> <span>{i > 0 ? `${i}.` : ""}</span> {c} </p>)}
      </div>
    </div >
  );
};

export default Accordion;
