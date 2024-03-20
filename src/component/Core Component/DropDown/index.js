import React, { useState, useRef, useEffect } from "react";
import SVG from "react-inlinesvg";
import  arrowUp  from "../../../icons/arrowUp.svg";
import  arrowDown from "../../../icons/arrowBottom.svg"
import "./style.css";

const Dropdown = () => {
  const selectItemRef = useRef();
  const [selection, setSelection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    
    {
      label: "English",
    },
    {
      label: "Arabic",
    },
  ];

  const handleClick = (label) => {
    setSelection(label);
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (selectItemRef.current && isOpen) {
      const scrollHeight = selectItemRef.current.getBoundingClientRect();
      const container = document.getElementById("options-container");
      if (container) {
        container.scrollTo({
          top: scrollHeight.y - 200,
          behavior: "smooth",
        });
      }
    }
  }, [isOpen]);

  return (
    <div className="dropdown-container">
      <div className="select" onClick={handleOpen}>
        {selection || <span >English</span>}
        <SVG src={isOpen ? arrowUp : arrowDown} width={24} height={24} />
      </div>
     
      {isOpen && (
        <div className="options" id="options-container">
          {options?.map((e, i) => {
            return (
           
                
              
              <div
                ref={e.label == selection ? selectItemRef : null}
                className={`opt ${e.label == selection ? "selected" : ""}`}
                onClick={() => handleClick(e.label)}
              >
               
                {e.label}
              </div>
           
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
