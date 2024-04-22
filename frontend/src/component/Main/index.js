import React from "react";
// import SideDrawer from "../SideDrawer";
import Navbar from "../Navbar";
import AllProduct from "../AllProduct";
import Bar from "../FirstBar";
import './style.css'
import UserManagment from "../userManagement";
import { Navigate, useNavigate } from "react-router-dom";
import ProductSection from "../ProductSection/ProductSection";
const Main = () => {
  const token = localStorage.getItem("token")
  const navigate=useNavigate()
  return (
    <div>
        <Bar/>
        <div  className="home">
      <Navbar />
      {/* <UserManagment/> */}
  
      </div>
      <button onClick={()=>navigate("/edit")}>EditProfile</button>
      <button onClick={()=>{
        navigate("/table")
      }}>Permission Table</button>
      <div onClick={()=>navigate("/allproduct")}>AllProduct</div>
      <button onClick={()=> navigate("/product")}>add product</button>
      <button onClick={()=> navigate("/static")}>ProductSection</button>
      <button onClick={()=> navigate("/SingleProduct")}>SingleProduct</button>

          <button onClick={()=> navigate("/SelectSection")}>SelectSection</button>
          <button onClick={()=> navigate("/page")}>page</button>


    </div>
  );
};

export default Main;
