import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
const LeftRightButton = (props) => {
  const {
    title,
    linkToBack,
    linkToForward,
    leftBtnTitle,
    rightBtnTitle,
    styleForTransferDetails,
    gotoNextPage,
  } = props;

  return (
    <div
      className={`
      ${styles.left_right_btn_div}
      ${styleForTransferDetails && styles.styleForTransferDetails}`}
    >
      {title?.length > 0 ? (
        <div className={styles.title_div}>
          <h3>{title}</h3>
        </div>
      ) : (
        ""
      )}

      <div className={styles.btns}>
        <Link href={linkToBack}>
          <span className={`btn btn_primary ${styles.go_back_btn}`}>
            <svg
              transform="scale(1)"
              fill="#efefef"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" />
            </svg>
            <span> {leftBtnTitle}</span>
          </span>
        </Link>
        {/* transferdetails page den  geelen linkForWard Undefined oldugunnan  Burda check up edirik Eger undefined ise normal linksiz btn kullanilacak ki
        Diger trfda check up edende Link ucun error vermesin
        */}
        {linkToForward ? (
          <Link href={linkToForward}>
            <span className={`btn btn_primary ${styles.continiue_btn}`}>
              <span>{rightBtnTitle}</span>
              <svg
                transform="scale(1)"
                fill="#efefef"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
              </svg>
            </span>
          </Link>
        ) : (
          <span
            className={`btn btn_primary ${styles.continiue_btn}`}
            onClick={(e) => gotoNextPage(e)}
          >
            <span>{rightBtnTitle}</span>
            <svg
              transform="scale(1)"
              fill="#efefef"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

export default LeftRightButton;
