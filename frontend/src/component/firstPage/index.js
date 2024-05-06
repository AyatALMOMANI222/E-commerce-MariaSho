import React, { useState, useEffect } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import { cartIcon, handIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import "./style.scss";
const FirstPage = () => {
  const [product, setProduct] = useState([]);
  const [type, setType] = useState("");

  const navigate = useNavigate();
  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:5000/product/${type}`)
  //       .then((response) => {
  //         console.log(response?.data);
  //         setProduct(response?.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching Product", error);
  //       });
  //   }, []);

  const handleClick = (type) => {
    setType(type);
    navigate(`/categorey/${type}`);
  };
  
  console.log(type);
  return (
    <div className="first-page">
      <div className="first-dev">
        <div className="navbar">
          <div className="right-dev">
            <img
              className="img"
              src="https://png.pngtree.com/png-vector/20190221/ourmid/pngtree-shopping-bag-graphic-design-template-png-image_690677.jpg"
            />

            <div className="title">MARIASHOP</div>
          </div>

          <div className="middle-dev">
            
<div onClick={() => handleClick("all")}>Shop</div>
<div onClick={() => handleClick("men")}>Men</div>
<div onClick={() => handleClick("women")}>Women</div>
<div onClick={() => handleClick("kids")}>Kids</div>

          </div>
          <div className="left-dev">
            <button
              className="btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="btn"
              onClick={() => {
               navigate("/register");
              }}
            >
              Register
            </button>
            <SVG src={cartIcon} width={24} height={24}></SVG>
          </div>
        </div>
      </div>

      <div className="Bottom-side">
        <div className="left-side">
          <div className="title">NEW ARRIVAL ONLY</div>
          <div className="new-hand">
            <div className="new">new</div>
            <SVG className="icon" src={handIcon} width={24} height={24}></SVG>
          </div>
          <div className="collection">collection</div>
          <div className="for-everyone">for everyone</div>
        </div>

        <div className="left-bottom-side">
          <img
            className="img"
            src="https://upload.3dlat.com/uploads/3dlat.com_21_18_f762_13b4519ec9e613.png"
          />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
