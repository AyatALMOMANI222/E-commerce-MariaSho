import React, { useState } from "react";
import axios from "axios";
import ProductSection from "../ProductSection/ProductSection";
import "./style.scss"
const ProductShow = () => {
  const [product, setProduct] = useState([]);
  const productArr = ["kids", "men", "women", "men", "women", "bag", "jeans"];
  const handleClick = (type) => {
    axios
      .get(`http://localhost:5000/product/${type}`)
      .then((response) => {
        console.log(response?.data);
        setProduct(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };

  return (
    <div className="product-type-container">
      <div className="type-container">
        {productArr.map((item) => {
          return (
            <div className="all-Type-container">
              <div className="type" onClick={() => handleClick(item)}>
                {item}
              </div>
            </div>
          );
        })}
      </div>

      <div className="one-product-containe">
       <div className="prod-container">
          {product.map((item2) => {
            return (
              <div className="one-product">
                <ProductSection details={item2} />
              </div>
            );
          })}
      </div>
      </div>
    </div>
  );
};

export default ProductShow;
