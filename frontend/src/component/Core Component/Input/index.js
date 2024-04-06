import React from "react";
import SVG from "react-inlinesvg";
import "./style.scss";
import InlineSVG from "react-inlinesvg";
const Input = ({
  classname,
  type,
  onChange,
  placeholder,
  value,
  errorMsg,
  label,
  required,
  icon,
  name
}) => {
  return (
    <div className="input-container">
      {label && (
        <div className="label-container">
          <span>{label}</span>
          {required && <span className="star">*</span>}
        </div>
      )}
      <div className="text-field-container">
        <input
          className={`text-field ${classname} ${errorMsg ? "error-msg" : " "} `}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          name={name}
        />
        {icon && (
          <SVG className="input-icon" src={icon} width={24} height={24}></SVG>
        )}
      </div>

      {errorMsg && <div className="error-msg-container">{errorMsg}</div>}
    </div>
  );
};

export default Input;
