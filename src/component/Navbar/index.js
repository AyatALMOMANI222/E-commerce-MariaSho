import React, { useState } from "react";
import { navContent } from "../../constant/navContent";
import { Link } from "react-router-dom";
import "./style.scss";

const Navbar = () => {
  const [openItem, setOpenItem] = useState(null);

  const handleClick = (itemName) => {
    setOpenItem(openItem === itemName ? null : itemName);
  };

  const closeOpenItem = () => {
    setOpenItem(null); 
  };

  return (
    <div className="nav-container" onClick={closeOpenItem}>
      <div className="navbar">
        {navContent.map((element, i) => (
          <div className="nav-name" key={i}>
            <div
              className="nav-element-name"
              onMouseOver={() => handleClick(element.name)}
            >
              {element.name}
            </div>
            {openItem === element.name && (
              <div className="nav-child">
                {element.children.map((n, j) => (
                  <div className="group" key={j}>
                    <div className="inner-name-title">{n.name}</div>
                    {n.child.map((l, k) => {
                      return <div className="inner-name" key={k}>{l.name}</div>;
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
