import React, { useState } from "react";
import "./style.css";

const PopoverExample = () => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setShowPopover(!showPopover)}>
        Toggle Popover
      </button>
      {showPopover && (
        <div className="popover">
          <div className="arrow"></div>
          <div className="popover-content">
            This is a popover content. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </div>
        </div>
      )}
    </div>
  );
};

export default PopoverExample;
