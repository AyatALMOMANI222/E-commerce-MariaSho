import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../Core Component/Modal";
import Buttons from "../Core Component/Buttons";
import Input from "../Core Component/Input";
import ImagesList from "../ImagesList";
import ImageUploade from "../Core Component/UploadImage";
import "./style.scss";

const EditProduct = ({ isOpen, setIsOpen, editProductId }) => {
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
  const a = {
    id: 5,
    name: "men",
    description: "hhh",
    image: null,
    price: null,
    colors: "red",
    sizes: "e",
    quantity: 7,
    type: "men",
    material: "d",
    brand: "d",
    created_at: "2024-05-10T13:05:38.000Z",
    updated_at: "2024-05-10T13:05:38.000Z",
  };
  const getProductById = () => {
    axios
      .get(`https://e-commerce-maria-sho.vercel.app/product/one/${editProductId}`, {})
      .then((response) => {
        console.log("hhhhh");
        console.log(response.data.product);
        const data = response.data.product;
        setProductInfo({
          name: data.name,
          // image1: "",
          description: data.description,
          price: data.price,
          sizes: data.sizes,
          colors: data.colors,
          type: data.type,
          material: data.material,
          brand: data.brand,
        });
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };
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
      .put(`https://e-commerce-maria-sho.vercel.app/product/${editProductId}`, productInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        console.log(editProductId);
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
          <div>
            <div className="edit-product-container">
              <Input
                placeholder="name"
                name="name"
                onChange={handleChange}
                value={productInfo.name}
                label={"Name"}
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
                label={"Description"}
              />
              <Input
                placeholder="price"
                name="price"
                onChange={handleChange}
                value={productInfo.price}
                label={"Price"}
              />
              <Input
                placeholder="sizes"
                name="sizes"
                onChange={handleChange}
                value={productInfo.sizes}
                label={"Sizes"}
              />
              <Input
                placeholder="colors"
                name="colors"
                onChange={handleChange}
                value={productInfo.colors}
                label={"Colors"}
              />
              <Input
                placeholder="type"
                name="type"
                onChange={handleChange}
                value={productInfo.type}
                label={"Type"}
              />
              <Input
                placeholder="material"
                name="material"
                onChange={handleChange}
                value={productInfo.material}
                label={"Material"}
              />
              <Input
                placeholder="brand"
                name="brand"
                onChange={handleChange}
                value={productInfo.brand}
                label={"Brand"}
              />
              {/* <ImagesList images={images} setImages={setImages} /> */}
            </div>
            <div className="actions-container">
              <Buttons onClick={() => setIsOpen(false)}>Cancel</Buttons>
              <Buttons
                onClick={() => {
                  handleEditClick(editProductId);
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
