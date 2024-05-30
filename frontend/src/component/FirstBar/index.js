import React, { useState, useEffect } from "react";
import Select from "../Core Component/Select";
import SVG from "react-inlinesvg";
import login from "../../icons/login.svg";
import Buttons from "../Core Component/Buttons";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Bar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const options = [
    { label: "Arabic", value: "arabic" },
    { label: "English", value: "english" },
  ];

  const handleClick = () => {
    setOpen(!open);
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleChange = (option) => {
    setValue(option);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const bar = document.querySelector(".bar");
      if (!bar.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="bar">
      <span>MariaShop</span>

      <div className="login-language">
        <div>
          <Select
            options={options}
            placeholder={"select ..."}
            value={value}
            setValue={handleChange}
          />
        </div>

        <div className="signup">
          <div className="login" onClick={handleClick}>
            <SVG
              className="login-icon"
              src={login}
              width={18}
              height={18}
            ></SVG>
            <div>Login</div>
          </div>

          {open && (
            <div className="login-signup">
              <Buttons
                onClick={handleLoginClick}
                type="button"
                className="custom-class"
              >
                Login
              </Buttons>

              <div>new to MariaShop?</div>
              <div
                onClick={() => {
                  navigate("/register");
                }}
                className="sign"
              >
                sign up
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bar;
