import React from "react";
import "./style.css";
const Radio = ({ value, setValue, options }) => {
  return (
    <div className="radio-container">
      <div className="options">
        {options?.map((e, i) => {
          return (
            <div className="radio">
              <input
                className="radio-input"
                checked={value === e?.value}
                type="radio"
                onClick={() => {
                  setValue(e?.value);
                }}
              />
              <div className="label">{e?.label}</div>
            </div>
          );
        })}
      </div>
      <div>{value}</div>
    </div>
  );
};

export default Radio;
