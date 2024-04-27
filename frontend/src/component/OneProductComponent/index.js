import React, { useState, useEffect } from "react";
import img2 from "../listimage/t2.jpg";
import img3 from "../listimage/t3.jpg";
import img4 from "../listimage/t4 (2).jpg";
import ColorsSection from "../ColorsSection";
import Size from "../SizeSection";
import Slider from "../Core Component/slider";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import CartContent from "../SideDrawer2";
import SideDrawer from "../CartPopup";
const SingleProduct = () => {
  const navigate = useNavigate();
  const { itemID } = useParams();
  const details = [
    `Model is 5'9", Waist 26" Chest 32", wearing size S`,
    `Model is 5'9", Waist 26" Chest 32", wearing size S`,
    `Model is 5'9", Waist 26" Chest 32", wearing size S`,
  ];

  const [selectedColor, setSelectedColor] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);

  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState("");
  const [images, setImages] = useState([]);
  // const [imageArr,setImageArr]=useState([])
  const [imageUrls, setImageUrls] = useState([]);
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/one/${itemID}`)
      .then((response) => {
        console.log(response?.data);
        const product = response?.data.product;

        setProduct(response?.data.product);
        console.log(product);
        const availablesize = product.sizes.split(",");
        console.log(availablesize);
        setAvailableSizes(availablesize);
        const availablecolor = product.colors.split(",");
        setAvailableColors(availablecolor);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/image/${itemID}`)
      .then((response) => {
        console.log(response?.data.images);
        setImages(response?.data.images);
        console.log(images);
        const imagesData = response?.data.images;
        const imageUrls = imagesData.map((image) => image.image_url); // استخراج عناوين URL للصورة فقط
        console.log(imageUrls);
        setImageUrls(imageUrls);
        console.log(imageUrls);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);
  console.log(token);
  const handleCartClick = (productId) => {
    axios
      .post(
        "http://localhost:5000/cart",
        {
          product_id: productId,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response?.data);
        // navigate("/cart")
        setIsOpen(!isOpen);
      })
      .catch((error) => {
        console.error("Error adding to the cart:", error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.cart);
        const cart = response.data.cart;
        setCart(cart);
        console.log(cart);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);
  console.log(cart);

  return (
    <div className="single-product-container">
      <div className="first-section">
        <div className="small-img">
          <img src={img2} className="img" />
          <img src={img3} className="img" />
          <img src={img4} className="img" />
        </div>
        <div className="large-img">
          <Slider imageUrls={imageUrls} />
        </div>
      </div>

      <div className="second-section">
        <div className="title">{product.name}</div>
        <div className="price">{product.price}$ USD</div>
        <div className="colors-chips-container">
          <ColorsSection
            availableColors={availableColors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        <div className="sizes-chips-containetr">
          <Size
            selectedSize={selectedSize}
            availablesize={availableSizes}
            setSelectedSize={setSelectedSize}
          />
        </div>

        {/* <button className="btn" onClick={()=>handleCartClick(product.id)}>ADD TO CART</button> */}
        <button
          className="btn"
          onClick={() => {
            togglePopup();
            handleCartClick(product.id);
          }}
        >
          ADD TO CART
        </button>

        <hr />
        {details.map((item) => {
          return (
            <div className="section-one">
              <span className="dot"></span>
              <div>{item} </div>
            </div>
          );
        })}
      </div>
      <SideDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={<CartContent />}
        title={"My Cark"}
      />
    </div>
  );
};

export default SingleProduct;
