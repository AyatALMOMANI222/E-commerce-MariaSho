import React from "react";
import "./style.scss";
const RadioInput = ({ title, value, setValue, checked }) => {
  return (
    <label className="sidebar-label-container">
      <input
        type="radio"
        name="test"
        onChange={() => {
          setValue(title);
        }}
        value={value}
      />

      {title}
    </label>
  );
};

export default RadioInput;
