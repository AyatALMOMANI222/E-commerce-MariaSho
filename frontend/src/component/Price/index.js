import React from "react";
import RadioGroup from "../Core Component/RadioGroup";
import "./style.scss";

const Price = ({ price, setPrice }) => {
  const priceOptions = [
    { label: "0$-50$", value: { min: 0, max: 50 } },
    { label: "50$-100$", value: { min: 50, max: 100 } },
    { label: "100$-150$", value: { min: 100, max: 150 } },
    { label: "150$-200$", value: { min: 150, max: 200 } },
  ];

  return (
    <div className="price-container">
      <div className="title">Price</div>
      <RadioGroup
        options={priceOptions}
        value={price}
        setValue={setPrice}
        checked={(val) => {
          if (val.min === price.min && val.max === price.max) {
            return true;
          } else {
            return false;
          }
        }}
        stringVal={`${price.min}$-${price.max}$`}
      />
    </div>
  );
};

export default Price;
