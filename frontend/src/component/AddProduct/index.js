import React, { useEffect, useState } from "react";
import Buttons from "../Core Component/Buttons";
import Input from "../Core Component/Input";
import SVG from "react-inlinesvg";
import closeIcon from "../../icons/close.svg";
import editIcon from "../../icons/editIcon.svg";
import ImageUploade from "../Core Component/UploadImage";
import axios from "axios";
// import Carousel from "../Core Component/carusel";
import ImagesList from "../ImagesList";
import EditProduct from "../EditProduct";
import ProductCard from "../Core Component/Card";
import "./style.scss";
const ProductAction = () => {
  const [product, setProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [editProductId, setEditProductId] = useState(null); // تحديد معرف المنتج المحدد للتحرير

  // function generateRandomId() {
  //   return Math.random().toString(36).substr(2, 9);
  // }
  const [image, setImage] = useState("");
  //  const [images, setImages] = useState([{ id: generateRandomId(), img: "" }]);

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
      {...productInfo, image:image},

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        console.log(response?.data.products);
        setProduct(response?.data.products);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting Product", error);
      });
  };

  const handleEditClick = (productId) => {
    setEditProductId(productId);
    setIsOpen(!isOpen); // تعيين معرف المنتج المحدد للتحرير
  };
  console.log(image);
  return (
    <div className="Product-container">
      <div className="one-product-container">
        {product?.map((item) => {
          return (
            <div key={item.id} className="product">
              <div className="header">
                {/* <div> {item.name}</div> */}
                <div className="iconn">
                  <SVG
                    src={editIcon}
                    width={24}
                    height={24}
                    onClick={() => handleEditClick(item.id)}
                  ></SVG>
                  <SVG
                    src={closeIcon}
                    onClick={() => deleteProduct(item.id)}
                  ></SVG>
                </div>
              </div>
              <div className="card-container">
              <ProductCard
              
                name={item.name}
                description={item.description}
                price={item.price}
                sizes={item.sizes}
                colors={item.colors}
                quantity={item.quantity}
                type={item.type}
                material={item.material}
                brand={item.brand}
                image={item.image}
               
buttonName="Add to Cart"
                
              />
              </div>
              {editProductId === item.id && isOpen && (
                <EditProduct
                  editProductId={editProductId}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              )}{" "}
              {/* <ImagesList
                productId={item.id}
                images={images}
                setImages={setImages}
              /> */}
            </div>
          );
        })}
      </div>{" "}
      <div className="add-container">
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

        {/* <ImagesList images={images} setImages={setImages} /> */}
        <Buttons onClick={() => handleClick(productInfo)}>Add Product</Buttons>
      </div>
    </div>
  );
};

export default ProductAction;
