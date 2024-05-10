import React from "react";
import OptionsTabs from "../optionsTab";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Header = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleAboutClick = () => {
    navigate("/about");
  };
  const handleClick = (type) => {
    navigate(`/products/${type}`);
  };

  return (
    <div className="outer-container">
      <div className="header-container">
        <div className="name">
          <OptionsTabs title="MARIASHOP" />
        </div>
        <div onClick={()=>{
          navigate("/")
        }}>
        <OptionsTabs title="Home" />
        </div>
        <OptionsTabs
          title="Collection"
          children={[
            {
              label: "men",
              onClick: () => handleClick("men"),
            },
            {
              label: "kids",
              onClick: () => handleClick("kids"),
            },
            {
              label: "women",
              onClick: () => handleClick("women"),
            },
          ]}
        />

        <div onClick={handleAboutClick}>
          <OptionsTabs title="About Us" />
        </div>
        <div onClick={()=>{
          navigate("/edit")
         }}>
         <OptionsTabs title="Profile" />
         </div>
        <div onClick={handleLoginClick} >         
          <OptionsTabs title="Login" />
        </div>
      
      </div>
    </div>
  );
};

export default Header;
