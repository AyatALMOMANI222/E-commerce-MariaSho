import React from "react";
import "./style.scss";
const RadioGroup = ({ options, value, setValue, checked }) => {
  return (
    <div className="radio-group-options">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={checked && checked(option.value) || value === option.value}
            onChange={() => setValue(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
