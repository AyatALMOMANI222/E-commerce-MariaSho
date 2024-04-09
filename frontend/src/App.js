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

      </Routes>
    </div>
  );
}

export default App;
