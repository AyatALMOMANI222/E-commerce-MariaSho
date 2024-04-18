import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.scss";
import ColorsSection from "../ColorsSection";
const OneProduct = () => {
  const [product, setProduct] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [availableColors, setAvailableColors] = useState([]);

  const { id } = useParams();

 useEffect(()=>{
  axios
  .get(`http://localhost:5000/product/one/${id}`)
  .then((response) => {
    console.log(response?.data);
    setProduct(response?.data.product);
    console.log(response.data.product.colors);
     setAvailableColors(response.data.product.colors.split(","))
     console.log(availableColors);
  })
  .catch((error) => {
    console.error("Error fetching Product", error);
  });
 },[])


  return (
    <div className="one-product-container">
      <div className="one-product">
        <div>
          <img src={product.image} className="image" />
        </div>
        <div className="product-content">
          <div className="first-section">
            <div className="product-name"> {product.name}</div>
            <div className="price"> {product.price}$</div>
          </div>
          <div className="description">
            <div> {product.description}</div>
          </div>
          {product && product.sizes && (
            <div className="size-container">
              {product.sizes.split(",").map((size, index) => (
                <div className="size" key={index}>
                  {size}
                </div>
              ))}
            </div>
          )}

<ColorsSection
        selectedColor={selectedColor}
        availableColors={availableColors}
        setSelectedColor={setSelectedColor}
      />
          <button className="btn">Add to Product</button>
        </div>
      </div>
    
    </div>
  );
};

export default OneProduct;
