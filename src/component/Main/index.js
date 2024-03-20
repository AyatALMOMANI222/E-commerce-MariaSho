import React from "react";
import SideDrawer from "../SideDrawer";
import Navbar from "../Navbar";
import Bar from "../FirstBar";
import './style.css'
const Main = () => {
  return (
    <div>
        <Bar/>
        <div  className="home">
      <SideDrawer />
      <Navbar />
      </div>
    </div>
  );
};

export default Main;
