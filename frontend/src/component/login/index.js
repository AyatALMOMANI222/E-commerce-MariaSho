import React, { useState } from "react";
import axios from "axios";
import Input from "../Core Component/Input";
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
        localStorage.setItem("token", token);
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
            placeholder="Username"
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
        <button className="login-btn" onClick={() => handleClick()}>
          Login
        </button>
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
