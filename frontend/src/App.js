import React, { useState } from "react";
import Login from "./component/login";
import Register from "./component/register";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./component/EditProfile";
import PermissionTable from "./component/PermissionTable";
import PopupExample from "./component/Core Component/Modal";
import ProductAction from "./component/AddProduct";
import AllProduct from "./component/AllProduct";
import ProductSection from "./component/ProductSection/ProductSection";
import SingleProduct from "./component/OneProductComponent/index";
import SelectSection from "./component/Filter";
import SideDrawer from "./component/SideDrawer";
import ViewProducts from "./component/ViewProducts";
import CartPopup from "./component/CartPopup";
import ViewCart from "./component/ViewCart";
import OptionsTabs from "./component/optionsTab";
import Home from "./component/home";
import About from "./component/About";
import { Button } from "@material-ui/core";
import Header from "./component/Header"
import ProductsPage from "./component/ProductsPage";
// import  Slider  from "./component/inputSlider";
import "./App.scss";

function App() {
  const [username, setUsername] = useState("");

  return (
    <div id="main" className="main-container">
{/* <ProductAction/> */}
<Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/edit" element={<EditProfile />}></Route>
        <Route path="/table" element={<PermissionTable />}></Route>
        <Route path="/popup" element={<PopupExample />}></Route>
        <Route path="/product" element={<ProductAction />}></Route>
        <Route path="/categorey/:type/:id" element={<SingleProduct />}></Route>
        <Route path="/allproduct" element={<AllProduct />}></Route>
        <Route path="/static" element={<ProductSection />}></Route>
        <Route
          path="/singleProduct/:itemID"
          element={<SingleProduct />}
        ></Route>
        <Route path="/SelectSection" element={<SelectSection />}></Route>
        <Route path="/page/:type" element={<ViewProducts />}></Route>
        <Route path="/cart" element={<CartPopup />}></Route>
        <Route path="/cart/viewcart" element={<ViewCart />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products/:currentType" element={<ProductsPage />}></Route>

      </Routes>
    </div>
  );
}

export default App;
