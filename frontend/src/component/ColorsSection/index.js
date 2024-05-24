import React, { useEffect, useState } from "react";
import "./style.scss";
const ColorsSection = ({
  availableColors,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <div className="color-section-container">
      {availableColors?.map((item) => {
        return (
          <div>
            <div
              className={`chip ${item} ${
                selectedColor === item ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedColor(item);
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default ColorsSection;
