import React, { useState } from "react";
import "./style.css";

const PopupExample = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setShowPopup(true)}>Open Popup</button>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Popup Content</h2>
            <p>This is the content of the popup.</p>
            <button onClick={() => setShowPopup(false)}>Close Popup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupExample;
