import React from "react";
import "./style.css";
const Input = ({ classname, type, onChange, placeholder, value, errorMsg }) => {
  return (
    <div>
      <input
        className={`input ${classname} ${errorMsg ? "input-error" : " "} `}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />

      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </div>
  );
};

export default Input;
