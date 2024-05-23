import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../Core Component/Input";
import Buttons from "../Core Component/Buttons";
import "./style.scss";

const Register = () => {
  const Navigate = useNavigate();
  const [regData, setRegData] = useState({
    username: "username",
    email: "email",
    password: "password",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

      setRegData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    
  };

  const handleClick = () => {
    axios
      .post(`http://localhost:5000/register`, regData)
      .then((response) => {
        console.log(response?.data);
        console.log(regData);
        Navigate("/login");
      })
      .catch((error) => {
        console.error("Error Registering:", error);
      });
  };

  return (
    <div className="register-container">
      <div className="register-section">
        <div className="name">Register</div>
        <div className="input-containerr">
          <Input
            placeholder="Username"
            onChange={handleChange}
            name="username"
            value={regData.username}
          />
          <Input
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={regData.email}
          />
          <Input
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={regData.password}
          />
   
        </div>
        <Buttons className="register-btn" onClick={() => handleClick()}>
          Register
        </Buttons>
        <div className="forget-password">
          <div className="forget">Forget-Password? </div>
          <div className="lo" onClick={() =>{
            Navigate("/login")
          } }>
            {" "}
            ..Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
