import React, { useEffect, useState } from "react";
import RadioInput from "../Core Component/RadioInput";
import "./style.scss";
const Size = ({ size, setSize }) => {
  const sizeArr = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  useEffect(() => {
    console.log(size);
  }, [size]);
  return (
    <div className="size-container">
      <div className="title">Sizes</div>

      {sizeArr.map((item) => {
        return (
          <div>
            <RadioInput title={item} value={size} setValue={setSize} />
          </div>
        );
      })}
    </div>
  );
};

export default Size;
