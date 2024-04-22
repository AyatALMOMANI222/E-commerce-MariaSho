import React, { useEffect, useState } from "react";
import Buttons from "../Core Component/Buttons";
import Input from "../Core Component/Input";
import ImageUploade from "../Core Component/UploadImage";
import axios from "axios";
import ImagesList from "../ImagesList";
import "./style.scss";
const ProductAction = () => {
  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }
  const [image, setImage] = useState("");
  const [images, setImages] = useState([
    { id: generateRandomId(), image_url: "" },
  ]);

  const [productInfo, setProductInfo] = useState({
    name: "",
    //  image:"",
    description: "",
    price: "",
    sizes: "",
    colors: "",
    type: "",
    material: "",
    brand: "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClick = (productInfo) => {
    console.log(productInfo);
    axios
      .post(
        `http://localhost:5000/product`,
        { ...productInfo, image: image, images: images },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response?.data);
      })
      .catch((error) => {
        console.error("Error Adding Product", error);
      });
  };

  return (
    <div className="insert-product-container">
      <div className="add-title">Add Product</div>
      <div className="add-product-container">
        <div className="add-product">
          <Input
            label={"Name"}
            placeholder="name"
            name="name"
            onChange={handleChange}
            value={productInfo.name}
          />
      
          <Input
            label={"Description"}
            placeholder="description"
            name="description"
            onChange={handleChange}
            value={productInfo.description}
          />
          <Input
            label={"Price"}
            placeholder="price"
            name="price"
            onChange={handleChange}
            value={productInfo.price}
          />
          <Input
            label={"Sizes"}
            placeholder="sizes"
            name="sizes"
            onChange={handleChange}
            value={productInfo.sizes}
          />
          <Input
            label={"Colors"}
            placeholder="colors"
            name="colors"
            onChange={handleChange}
            value={productInfo.colors}
          />
          <Input
            label={"Type"}
            placeholder="type"
            name="type"
            onChange={handleChange}
            value={productInfo.type}
          />
          <Input
            label={"Material"}
            placeholder="material"
            name="material"
            onChange={handleChange}
            value={productInfo.material}
          />
          <Input
            label={"Brand"}
            placeholder="brand"
            name="brand"
            onChange={handleChange}
            value={productInfo.brand}
          />
    <ImageUploade
          inputValue={image}
          setInputValue={setImage}
          label="Select Picture"
          allowedExtensions={["jpg", "jpeg", "png", "gif"]}
        />
          <ImagesList images={images} setImages={setImages} />
        </div>
        <div className="add-product-btn">
          <Buttons onClick={() => handleClick(productInfo)}>
            Add Product
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default ProductAction;
