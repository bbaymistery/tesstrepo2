import React from "react";
const CustomError = () => {
  return (
    <div className="error_pagee">
      <div id="mainC">
        <div className="message">
          <h1>404</h1>
          <h3>the page you seek does not exist</h3>
          &nbsp;
        </div>
        <div className="footer">
          <a href="/" title="home">
            Go Back <span></span>
          </a>
          <p className="legal">
            &copy; London-heathrow.taxi 2022 <br /> All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomError;
