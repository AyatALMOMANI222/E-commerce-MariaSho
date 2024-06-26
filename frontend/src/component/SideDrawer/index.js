import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";
import { modules } from "../../constant/module";
import {
  logo,
  arrowBottom,
  arrowUp,
  notification,
  settings,
} from "../../icons";
import "./style.scss";
const SideDrawer = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isExpand, setIsExpand] = useState(true);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpand(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };
  const handleClick = () => {
    setIsExpand(!isExpand);
  };
  const handleTypeClick = (path) => {
    navigate(path);
  };
  console.log(type);
  return (
    <div className={`side-drawer-container ${!isExpand ? "expand" : ""}`}>
      <div className="logo-container">
        <SVG
          className="logo-icon"
          onClick={() => handleClick()}
          src={logo}
          width={34}
          height={34}
        ></SVG>
        {isExpand && <span className="product">PRODUCTS</span>}
      </div>
      <div className="main-container">
        {modules.map((item1, index) => {
          return (
            <div className="modules-section">
              <span className="title">{item1.title}</span>
              {item1.children.map((item) => {
                let isOpen = selectedItem === item;
                return (
                  <div key={index} className={`section-container`}>
                    <div
                      className={`section`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="icon-typee">
                        <SVG
                          className="section-icon"
                          src={item.icon}
                          width={24}
                          height={24}
                        ></SVG>
                        {isExpand && <span>{item.name}</span>}
                      </div>
                      {isExpand && (
                        <SVG
                          className="arrow-icon"
                          src={isOpen ? arrowBottom : arrowUp}
                        ></SVG>
                      )}
                    </div>
                    {isOpen && (
                      <div className={`children ${!isExpand ? "expand" : ""}`}>
                        {item.children.map((childItem, childIndex) => {
                          return (
                            <div key={childIndex} className="child">
                              <div
                                onClick={() => handleTypeClick(childItem.path)}
                              >
                                {childItem.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="not-setting">
        <div className="notification">
          <SVG
            className="not-setting-icon"
            width={34}
            height={34}
            src={notification}
          ></SVG>
          {isExpand && <span>Notifications</span>}
        </div>

        <div className="settings">
          <SVG className="not-setting-icon" src={settings}></SVG>
          {isExpand && <span>Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
