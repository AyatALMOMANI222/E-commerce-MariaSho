import React, { Fragment, useState, useEffect, useRef } from "react";
import OptionsTabs from "../optionsTab";
import { useNavigate } from "react-router-dom";
import mainIcon from "../../icons/main.svg";
import "./style.scss";
import SVG from "react-inlinesvg";

const Header = () => {
  const [showHeader, setShowHeader] = useState(false);
  const navigate = useNavigate();
  const permissions = localStorage.getItem("permission").split(",");
  console.log({ permissions });

  const headerRef = useRef(null);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleClick = (type) => {
    navigate(`/products/${type}`);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowHeader(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerRef]);

  return (
    <div className="outer-container">
      {window.innerWidth <= 767 && (
        <div className="fra">
          <SVG
            className="main-icon"
            src={mainIcon}
            width={24}
            height={24}
            onClick={() => setShowHeader(!showHeader)}
          ></SVG>
          <div className="app-name" style={{ fontFamily: "cursive" }}>
            Mariashop
          </div>
        </div>
      )}
      <div ref={headerRef} className={`header-container ${!showHeader && "hide"}`}>
        <div className="name">
          <OptionsTabs title="MARIASHOP" />
        </div>
        <div onClick={() => navigate("/")}>
          <OptionsTabs title="Home" />
        </div>
        <OptionsTabs
          title="Collection"
          children={[
            { label: "men", onClick: () => handleClick("men") },
            { label: "kids", onClick: () => handleClick("kids") },
            { label: "women", onClick: () => handleClick("women") },
          ]}
        />
        <div onClick={() => navigate("/edit")}>
          <OptionsTabs title="Profile" />
        </div>
        <div onClick={() => navigate("/orders")}>
          <OptionsTabs title="Orders" />
        </div>
        <div onClick={() => navigate("/cart/viewcart")}>
          <OptionsTabs title="Cart" />
        </div>
        {permissions.includes("admin") && (
          <OptionsTabs
            title="Admin"
            children={[
              { label: "Add Product", onClick: () => navigate(`/product`) },
              { label: "Add Permission", onClick: () => navigate(`/permission`) },
            ]}
          />
        )}
        <div onClick={handleLoginClick}>
          <OptionsTabs title="Login" />
        </div>
        <div onClick={handleLogout}>
          <OptionsTabs title="Logout" />
        </div>
      </div>
    </div>
  );
};

export default Header;
