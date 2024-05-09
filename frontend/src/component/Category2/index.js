import React, { useEffect, useState } from "react";
import RadioGroup from "../Core Component/RadioGroup";
import "./style.scss";

const Categorey2 = ({ categorey, setCategorey }) => {
  const categoryOptions = [
    { label: "men", value: "men" },
    { label: "women", value: "women" },
    { label: "kids", value: "kids" },
    { label: "T-shirts", value: "T-shirts" },
  ];

  return (
    <div className="cat-container">
      <div className="title">Categorey</div>
      <RadioGroup
        options={categoryOptions}
        value={categorey}
        setValue={setCategorey}
      />
    </div>
  );
};

export default Categorey2;
