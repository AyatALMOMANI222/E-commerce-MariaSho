import React from "react";
import "./style.css";
const Card = ({ title, text, image }) => {
  return (
    <div className="card">
      <img className="card-image" src={image} alt="Card" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
