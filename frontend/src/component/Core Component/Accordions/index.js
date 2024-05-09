import React,{useState} from "react";
import SVG from "react-inlinesvg";
import arrowDown from "../../../icons/arrowDown.svg";
import arrowUp from "../../../icons/arrowUp.svg";
import "./style.scss";
const Accordion = ({ label, text }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="accordion-container">
      <div className="outer">
        <div className="label" onClick={handleClick}>
          {label}
        </div>
        <SVG
          className="icons"
          onClick={handleClick}
          src={open ? arrowUp : arrowDown}
          width={24}
          height={24}
        />
      </div>
      {open && <div className="text">{text}</div>}
    </div>
  );
};

export default Accordion;


