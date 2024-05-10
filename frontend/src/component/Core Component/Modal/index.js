import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { closeIcon } from "../../../icons";
import "./style.scss";

const Popup = ({ popupContent, header, open, setOpen }) => {
  return (
    <div className="container">
      {open && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="title-container">
              <span className="title">{header}</span>
              <SVG src={closeIcon} onClick={() => setOpen(false)}></SVG>
            </div>
            <div className="popup-content">{popupContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Popup;
