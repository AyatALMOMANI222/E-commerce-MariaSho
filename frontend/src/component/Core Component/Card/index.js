import React from "react";
import "./style.scss";

const ProductCard = ({ name, description, price, image,onClick ,buttonName}) => {
  return (
    <div className="product-card">
      <div className="card">
        <img className="img" src={image} />
        <div className="card-content">
          <h3 className="card-title">{name}</h3>
          <h5 className="card-description">{description}</h5>
          <p className="card-price">{price}$</p>
          <button className="card-button" onClick={onClick}>{buttonName}</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
