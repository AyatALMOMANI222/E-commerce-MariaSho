import React, { useEffect, useState } from "react";
import RadioInput from "../Core Component/RadioInput";
import Categorey2 from "../Category2/index";
import Price from "../Price";
import Colors2 from "../color2";
import Size from "../Size";
import "./style.scss";
import axios from "axios";

const SideBar = () => {
  const [price, setPrice] = useState({ min: 0, max: 50 });
  const [color,setColor]=useState("")
  const [product, setProduct] = useState([]);
  const[categorey,setCategorey]=useState("")
  const[size,setSize]=useState("")
  const getProduct = () => {
    axios
      .get("http://localhost:5000/filter", {
        params: {
          page: 1, // Example: you can replace with actual values
          limit: 10, // Example: you can replace with actual values
        //   name: "yourNameValue", // Example: you can replace with actual values
          type: categorey, // Example: you can replace with actual values
          size: size, // Example: you can replace with actual values
          color: color, // Example: you can replace with actual values
          minPrice: price.min, // Example: you can replace with actual values
          maxPrice: price.max, // Example: you can replace with actual values
        },
      })
      .then((response) => {
        console.log(response?.data);
        setProduct(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };
useEffect(()=>{
    getProduct()
},[size,color,categorey,price])

  return (
    <div className="sidebar-container">
        <button onClick={()=>getProduct()}>save</button>
      <div className="container">
        <div className="name"> MARIASHOP</div>
      </div>
      <div className="filter-container">
        <div className="filter">
          {" "}
          <Categorey2 categorey={categorey} setCategorey={setCategorey}/>
        </div>
        <div className="filter">
          {" "}
          <Price price={price} setPrice={setPrice} />
        </div>
        <div className="filter">
          {" "}
          <Colors2 color={color} setColor={setColor} />
        </div>
        <div className="filter">
          {" "}
          <Size  size={size} setSize={setSize}/>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
