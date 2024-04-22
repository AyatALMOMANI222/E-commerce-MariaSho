import React, { useState } from "react";
import { heartIcon, starIcon, heart } from "../../icons";
import SVG from "react-inlinesvg";
import "./style.scss";
const ProductSection = ({details}) => {
  console.log(details);
  const [fillIcon, setFillIcon] = useState("black");

  return (
    <div className="one-product-container">
      <div className="image-container">
        
        <img src={details.image} className="image" />
        <div
          className="img-icon"
          onClick={() =>
            setFillIcon((prev) => {
              return prev === "red" ? "black" : "red";
            })
          }
        >
          <SVG
            height={20}
            width={20}
            src={heart}
            fill={fillIcon}
            className="heart-icon"
          ></SVG>
        </div>
      </div>
      <div className="second-section">
        <div className="title">{details.title}</div>
        <div>{details.desc}</div>
        <div>{details.type}</div>
        <div className="prod-content">
          <div className="right-side">
            <SVG
              src={starIcon}
              className="star-icon"
              width={18}
              height={18}
            ></SVG>
            <div>{details.rate}</div>
          </div>
          <div className="price">{details.price}$</div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
