import React from "react";
import SVG from "react-inlinesvg";
import { facebookIcon, twitterIcon } from "../../icons";
import "./style.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-icon">
        <a href="https://www.facebook.com/">
          {" "}
          <SVG
            className="icon"
            width={24}
            height={24}
            src={facebookIcon}
          ></SVG>{" "}
        </a>
        <a href="https://x.com/">
          <SVG className="icon" width={24} height={24} src={twitterIcon}></SVG>{" "}
        </a>
      </div>
      <div>© 2035 by Shoe Fetish. Powered and secured by Wix</div>
    </div>
  );
};

export default Footer;
