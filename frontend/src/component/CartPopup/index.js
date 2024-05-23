import React, { useEffect, useState } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import { closeIcon } from "../../icons";
import CartContent from "../SideDrawer2";
import "./style.scss";

const SideDrawer = ({setPrice ,isOpen, setIsOpen, content, title }) => {

  const closePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`popup-containerrr ${!isOpen ? "container-close" : ""}`}>
      <div className={`popup2 ${isOpen ? "open" : "close"}`}>
        <div className="popup-content">
          <div className="header-section">
            <span className="title">{title}</span>
            <SVG
              height={20}
              width={20}
              src={closeIcon}
              onClick={closePopup}
            ></SVG>
          </div>
          <div className="popup-content-container">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
