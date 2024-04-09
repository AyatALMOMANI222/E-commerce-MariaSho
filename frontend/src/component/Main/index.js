import React from "react";
import SideDrawer from "../SideDrawer";
import Navbar from "../Navbar";
import Bar from "../FirstBar";
import './style.css'
import UserManagment from "../userManagement";
import ImageUpload from "../UploadPhoto/index";
import { Navigate, useNavigate } from "react-router-dom";
const Main = () => {
  const navigate=useNavigate()
  return (
    <div>
        <Bar/>
        <div  className="home">
      <SideDrawer />
      <Navbar />
      <UserManagment/>
      <button onClick={()=>navigate("/edit")}>EditProfile</button>
      <button onClick={()=>{
        navigate("/table")
      }}>Permission Table</button>
      </div>
    </div>
  );
};

export default Main;
