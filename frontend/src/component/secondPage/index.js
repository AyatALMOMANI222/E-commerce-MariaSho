import React from "react";
import "./style.scss";
import { Button, Input } from "@material-ui/core";
import Buttons from "../Core Component/Buttons";
const SecondPage = () => {
  return (
    <div className="page-container">
      <div className="img-container">
        <img
          className="img"
          src="https://images.pexels.com/photos/5705477/pexels-photo-5705477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>

      <div className="square-container">
        <div className="text">
          Be the first to learn about the latest trends and special offers
        </div>

        <Input className="input" placeholder="Enter your email here" />

        <button className="btn">Subscribe Now</button>
      </div>
    </div>
  );
};

export default SecondPage;
