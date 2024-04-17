import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.scss";
import ColorsSection from "../ColorsSection";
const OneProduct = () => {
  const [product, setProduct] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [availableColors, setAvailableColors] = useState(["white", "gray","yellow","lime-green","green","blue","red"]);

  const { id } = useParams();

  const getProduct = () => {
    console.log(id);
    axios
      .get(`http://localhost:5000/product/one/${id}`)
      .then((response) => {
        console.log(response?.data);
        setProduct(response?.data.product);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

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

          {product && product.colors && (
            <div className="color-container">
              {product.colors.split(",").map((color, index) => (
                <div className="color" key={index}>
                  {color}
                </div>
              ))}
            </div>
          )}
          <button className="btn">Add to Product</button>
        </div>
      </div>
      <ColorsSection
        selectedColor={selectedColor}
        availableColors={availableColors}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};

export default OneProduct;
