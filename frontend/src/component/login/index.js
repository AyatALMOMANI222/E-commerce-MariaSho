import React, { useState } from "react";
import axios from "axios";
import Input from "../Core Component/Input";
import Buttons from "../Core Component/Buttons";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Login = () => {
  const [LoginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleClick = () => {
    axios
      .post("http://localhost:5000/login", LoginData)
      .then((response) => {
        console.log(response?.data);
        const token = response?.data.userToken;
        const user_id = response?.data.user_id;
        const permission = response?.data.permission;
        const cartId = response?.data.cartId;

        console.log({ permission });
        localStorage.setItem("token", token);
        localStorage.setItem("permission", permission);
        localStorage.setItem("cartId", cartId);
        // localStorage.setItem("", user_id);

        console.log(user_id);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error Login:", error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegClick = () => {
    navigate("/register");
  };
  return (
    <div className="login-container">
      <div className="login-section">
        <div className="login-title">Login</div>
        <div className="fields-container">
          <Input
            name="email"
            placeholder="email"
            onChange={handleChange}
            value={LoginData.email}
            label="Email Address"
          />
          <Input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={LoginData.password}
            label="Password"
          />
        </div>
        <Buttons className="login-btn" onClick={() => handleClick()}>
          Login
        </Buttons>
        <div className="note-container">
          Don't have an account?
          <span className="register" onClick={() => handleRegClick()}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
