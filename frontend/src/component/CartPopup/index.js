import React, { useEffect, useState } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import { closeIcon } from "../../icons";
import CartContent from "../SideDrawer2";
import "./style.scss";

const SideDrawer = ({ isOpen, setIsOpen, content, title }) => {
  const token = localStorage.getItem("token");

  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <div className={` ${isOpen ? "popup-containerr" : ""}`}>
      <div className={`popup ${isOpen ? "open" : "close"}`}>
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
