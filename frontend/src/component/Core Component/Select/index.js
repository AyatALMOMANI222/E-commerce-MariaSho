import React, { useState } from "react";
import "./style.scss";
import SVG from "react-inlinesvg";
import { arrowBottom, arrowUp } from "../../../icons";
const Select = ({
  options,
  value,
  setValue,
  errorMsg,
  required,
  label,
  placeholder = "Select",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue) => {
    setValue(optionValue);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      {label && (
        <div className="label-container">
          <span>{label}</span>
          {required && <span className="star">*</span>}
        </div>
      )}

      <div
        className={`dropdown-header ${errorMsg ? "error-msg" : ""}`}
        onClick={toggleDropdown}
      >

        {value ? (
          <span className="option-value">
            {
              options.find((item) => {
                return item.value === value;
              }).label
            }
          </span>
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}


        <SVG className="arrow-icon" src={!isOpen ? arrowUp : arrowBottom}></SVG>

      </div>

      {isOpen && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
    </div>
  );
};

export default Select;

