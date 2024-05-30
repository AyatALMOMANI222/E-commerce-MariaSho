import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

const OptionsTabs = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="options-tabs-container" ref={optionsRef}>
      <div className="title" onClick={() => setOpen(!open)}>
        {title}
      </div>
      {open && (
        <div className="children open">
          {children?.map((item) => {
            return (
              <div
                key={item.label}
                onClick={() => {
                  item.onClick && item.onClick();
                }}
              >
                <div className="label">{item.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OptionsTabs;
