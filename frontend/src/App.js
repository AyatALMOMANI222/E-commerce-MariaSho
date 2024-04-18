import React, { useState } from "react";
import Main from "./component/Main";
import Login from "./component/login";
import Register from "./component/register";
import { arrowUp } from "./icons";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Input from "./component/Core Component/Input";
import EditProfile from "./component/EditProfile";
import PermissionTable from "./component/PermissionTable";
import PopupExample from "./component/Core Component/Modal";
import ProductAction from "./component/AddProduct";
import Categorey from "./component/Categorey";
import OneProduct from "./component/oneProduct";
import AllProduct from "./component/AllProduct";
function App() {
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/edit" element={<EditProfile />}></Route>
        <Route path="/table" element={<PermissionTable />}></Route>
        <Route path="/popup" element={<PopupExample />}></Route>
        <Route path="/product" element={<ProductAction />}></Route>
        <Route path="/categorey/:type" element={<Categorey />}></Route>
        <Route path="/categorey/:type/:id" element={<OneProduct />}></Route>
        <Route path="/allproduct" element={<AllProduct />}></Route>

      </Routes>
  
    </div>
  );
}

export default App;
