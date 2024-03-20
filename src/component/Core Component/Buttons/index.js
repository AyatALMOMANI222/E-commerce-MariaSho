import React from "react";
import "./style.css";
const Buttons = ({ onClick, children, type, className }) => {
  return (
    <div>
      <button onClick={onClick} className={`button ${className}`} type={type}>
        {children}
      </button>
    </div>
  );
};

export default Buttons;
