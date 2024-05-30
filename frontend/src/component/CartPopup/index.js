import React, { useEffect, useState } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import { closeIcon } from "../../icons";
import CartContent from "../SideDrawer2";
import "./style.scss";

const SideDrawer = ({
  setPrice,
  isOpen,
  setIsOpen,
  content,
  title,
  footer,
}) => {
  const closePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`container-side-drawer ${!isOpen ? "container-close" : ""}`}
    >
      <div className={`popup2 ${isOpen ? "open" : "close"}`}>
        <div className="popup-content">
          <div className="header-section">
            <span className="title">{title}</span>
            <SVG
              height={18}
              width={18}
              src={closeIcon}
              onClick={closePopup}
            ></SVG>
          </div>
          <div className="body-container">{content}</div>
          <div className="footer-container">{footer}</div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
