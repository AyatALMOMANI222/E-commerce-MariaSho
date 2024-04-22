import React, { useState, useRef, useEffect } from "react";
import SVG from "react-inlinesvg";
import { arrowUp, arrowBottom } from "../../icons";
import "./style.scss";

const SelectSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const filter = { title: "type", children: ["jeans", "t-shirt"] };
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-container" ref={dropdownRef}>
      <div className="title-section" onClick={handleClick}>
        <div>{filter.title}</div>
        <SVG src={isOpen ? arrowUp : arrowBottom}></SVG>
      </div>
      <div className="inside-filter">
        {isOpen && (
          <div className="children">
            {filter.children.map((child, index) => (
              <div className="single-section" key={index}>
                <div className="child"> {child}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSection;
