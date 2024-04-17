import React, { useState } from "react";
import axios from "axios";
import Popup from "../Core Component/Modal";
import Buttons from "../Core Component/Buttons";
import Input from "../Core Component/Input";
import ImagesList from "../ImagesList";
import ImageUploade from "../Core Component/UploadImage";
import "./style.scss";

const EditProduct = ({ isOpen, setIsOpen ,editProductId }) => {
  const [image, setImage] = useState();
  const [images, setImages] = useState([{ id: generateRandomId(), img: "" }]);
  const token = localStorage.getItem("token");
  const [productInfo, setProductInfo] = useState({
    name: "",
    // image1: "",
    description: "",
    price: "",
    sizes: "",
    colors: "",
    type: "",
    material: "",
    brand: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }
  const handleEditClick = (editProductId) => {
    console.log(productInfo);
    axios
      .put(`http://localhost:5000/product/${editProductId}`, productInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Product updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
      });
  };

  return (
    <div>
      <Popup
        className="first-container"
        header={"Edit Product"}
        popupContent={
          <div className="EditProduct-container">
            <Input
              placeholder="name"
              name="name"
              onChange={handleChange}
              value={productInfo.name}
            />
            <ImageUploade
              inputValue={image}
              setInputValue={setImage}
              label="Select Picture"
              allowedExtensions={["jpg", "jpeg", "png", "gif"]}
            />
            <Input
              placeholder="description"
              name="description"
              onChange={handleChange}
              value={productInfo.description}
            />
            <Input
              placeholder="price"
              name="price"
              onChange={handleChange}
              value={productInfo.price}
            />
            <Input
              placeholder="sizes"
              name="sizes"
              onChange={handleChange}
              value={productInfo.sizes}
            />
            <Input
              placeholder="colors"
              name="colors"
              onChange={handleChange}
              value={productInfo.colors}
            />
            <Input
              placeholder="type"
              name="type"
              onChange={handleChange}
              value={productInfo.type}
            />
            <Input
              placeholder="material"
              name="material"
              onChange={handleChange}
              value={productInfo.material}
            />
            <Input
              placeholder="brand"
              name="brand"
              onChange={handleChange}
              value={productInfo.brand}
            />
            <ImagesList images={images} setImages={setImages} />
            <div className="actions-container">
              <Buttons onClick={() => setIsOpen(false)}>Cancel</Buttons>
              <Buttons
                onClick={() => {
               handleEditClick(editProductId)
                }}
              >
                Save
              </Buttons>
            </div>
          </div>
        }
        open={isOpen}
        setOpen={setIsOpen}
      />
    </div>
  );
};

export default EditProduct;
