import React from "react";
import RadioGroup from "../Core Component/RadioGroup";
import "./style.scss";
const Colors2 = ({ color, setColor }) => {
  const colorOptions = [
    { label: "red", value: "red" },
    { label: "purple", value: "purple" },
    { label: "blue", value: "blue" },
    { label: "green", value: "green" },
    { label: "black", value: "black" },
    { label: "yellow", value: "yellow" },
  ];

  return (
    <div className="colors-container">
      <div className="title">Colors</div>
      <RadioGroup options={colorOptions} value={color} setValue={setColor} />
    </div>
  );
};

export default Colors2;
