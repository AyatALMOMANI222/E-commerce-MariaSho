import React, { useState } from "react";
import SVG from "react-inlinesvg";
import  arrowDown  from "../../../icons/arrowDown.svg";
import arrowUp from "../../../icons/arrowUp.svg"
import "./style.css";

const Accordions = () => {
  const [label, setLabel] = useState("");
  const [open, setOpen] = useState(false);
  const Accordions = [
    {
      label: "section1",
      text: "section 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed lectus vitae lectus tempus consequat.",
    },
    {
      label: "section2",
      text: "section 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed lectus vitae lectus tempus consequat.",
    },
    {
      label: "section3",
      text: "section 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed lectus vitae lectus tempus consequat.",
    },
  ];
  const handleClick = (label) => {
    setLabel(label);
    setOpen(!open);
  };
  return (
    <div className="accordions-container">
      <div className="accordion-style">Accordion Style</div>
      <div className="sections">
        {Accordions.map((e, i) => {
          return (
            <div>
              <div className="outer">
                <div className="label" onClick={() => handleClick(e.label)}>
                  {e.label}
                </div>
                <SVG
                  onClick={() => handleClick(e.label)}
                  className="icons"
                  src={open ? arrowUp : arrowDown}
                  width={24}
                  height={24}
                />
              </div>
              {open && label == e.label ? (
                <div onClick={() => setOpen(!open)}>{e.text}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordions;
