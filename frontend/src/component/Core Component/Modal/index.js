import React, { useState } from "react";
import SVG from "react-inlinesvg";
import "./style.scss";
import { closeIcon } from "../../../icons";

const Popup = ({  popupContent , header ,open ,setOpen}) => {

  return (
    <div className="container">
      {open && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="title-container">
              <span className="title">{header}</span>
              <SVG src={closeIcon} onClick={() => setOpen(false)}></SVG>
            </div>
         <div>{popupContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Popup;
