import React from "react";
import SideDrawer from "../SideDrawer";
import Navbar from "../Navbar";
import Bar from "../FirstBar";
import './style.css'
import UserManagment from "../userManagement";
import { Navigate, useNavigate } from "react-router-dom";
const Main = () => {
  const token = localStorage.getItem("token")
  const navigate=useNavigate()
  return (
    <div>
        <Bar/>
        <div  className="home">
      <SideDrawer />
      <Navbar />
      {/* <UserManagment/> */}
  
      </div>
      <button onClick={()=>navigate("/edit")}>EditProfile</button>
      <button onClick={()=>{
        navigate("/table")
      }}>Permission Table</button>
      <button onClick={()=> navigate("/product")}>add product</button>
    </div>
  );
};

export default Main;
