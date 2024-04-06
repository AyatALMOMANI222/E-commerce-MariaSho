import React from "react";
import SideDrawer from "../SideDrawer";
import Navbar from "../Navbar";
import Bar from "../FirstBar";
import './style.css'
import UserManagment from "../userManagement";
const Main = () => {
  return (
    <div>
        <Bar/>
        <div  className="home">
      <SideDrawer />
      <Navbar />
      <UserManagment/>
      </div>
    </div>
  );
};

export default Main;
