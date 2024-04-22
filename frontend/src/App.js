import React, { useState } from "react";
import Main from "./component/Main";
import Login from "./component/login";
import Register from "./component/register";
import { arrowUp } from "./icons";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Input from "./component/Core Component/Input";
import EditProfile from "./component/EditProfile";
import PermissionTable from "./component/PermissionTable";
import PopupExample from "./component/Core Component/Modal";
import ProductAction from "./component/AddProduct";
import Categorey from "./component/Categorey";
import OneProduct from "./component/oneProduct";
import AllProduct from "./component/AllProduct";
import ProductSection from "./component/ProductSection/ProductSection";
import SingleProduct from "./component/OneProductComponent/index"
import SelectSection from "./component/Filter"
import Text from "./component/text";
import SideDrawer from "./component/SideDrawer";
import ViewProducts from "./component/ViewProducts";
function App() {
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <SideDrawer />
      <div id="main" className="main-container">
      <Routes>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/edit" element={<EditProfile />}></Route>
        <Route path="/table" element={<PermissionTable />}></Route>
        <Route path="/popup" element={<PopupExample />}></Route>
        <Route path="/product" element={<ProductAction />}></Route>
        <Route path="/categorey/:type" element={<Categorey />}></Route>
        <Route path="/categorey/:type/:id" element={<OneProduct />}></Route>
        <Route path="/allproduct" element={<AllProduct />}></Route>
        <Route path="/static" element={<ProductSection />}></Route>
        <Route path="/singleProduct/:itemID" element={<SingleProduct />}></Route>
        <Route path="/SelectSection" element={<SelectSection />}></Route>
        <Route path="/page" element={<ViewProducts />}></Route>


       
      </Routes>
  
      </div>
      
    </div>
  );
}

export default App;
