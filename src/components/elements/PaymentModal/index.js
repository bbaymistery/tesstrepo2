import React from "react";
import "./styles.module.scss";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useDispatch } from "react-redux";
const PaymentModal = (props) => {
  let { modalStatus, setToFalse, header = "Confirmation", body, btnText = "Book Now", showCloseIcon = true } = props
  // You  have chosen to pay by cash.
  const dispatch = useDispatch();

  let clickedOutside = useOutsideClick(wrapperRef);
  useEffect(() => {
    if (clickedOutside) {
      // dispatch({ type: "SET_MODAL_INFO", data: { trueOrFalse: false } });
      //setToFalse()
    }
  }, [clickedOutside, dispatch])


  return (modalStatus ?
    <div className={`${styles.content_modal} appear`}>
      <div className={`${styles.confirmation_box} `} ref={wrapperRef}>
        <div className={styles.header}>
          {/* header text  */}
          <p>{header}</p>
          {showCloseIcon ? <i onClick={setToFalse} className="fa-solid fa-xmark"></i> : <></>}
        </div>
        <div className={styles.body}>
          {/* bodyText */}
          <p>{body}</p>
        </div>
        <div className={styles.footer}>
          <button onClick={setToFalse} className="btn btn_primary"> {btnText}</button>
        </div>
      </div>
    </div >
    : <></>
  );
};

export default PaymentModal;
