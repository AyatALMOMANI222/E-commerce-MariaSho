import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import cartIcon from "../../icons/cartIcon.svg";
import { deleteIcon } from "../../icons";
import "./style.scss";
import ColorsSection from "../ColorsSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CartContent = () => {
  const [cartPro, setCartPro] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const detail = [
    {
      type: "kids",
      color: "red",
      desc: "بلوزة لون احمر",
      price: 22,
      qty: 1,
      img: "https://th.bing.com/th/id/R.0d4f8f03cb8176fe467ead11da66fff8?rik=ZhOZqZUg6w%2fJdg&pid=ImgRaw&r=0",
    },
  ];
  const calculateTotalPrice = (price, quantity) => {
    let totalPrice = 0;
    cartPro.forEach((product) => {
      totalPrice += price * quantity;
    });
    return totalPrice;
  };

  const totalCartPrice = cartPro.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/cartproduct`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const cartPro = response?.data.cart;
        setCartPro(cartPro);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);
  return (
    <div className="popup-container">
      <div className="first-container">
        <div className="name-icon">
          <div className="name">MariaShop {detail[0].type}</div>
          <SVG src={cartIcon} width={24} height={24}></SVG>
        </div>
      </div>

      <div>
        {cartPro.map((item) => (
          <div className="product-picture">
            <div className="desc-color">
              <div className="desc">MariaShop {item.description}</div>
              <div className="color-qty">
                <div className={`chip ${item.color}`}></div>
                <div>{item.quantity}</div>
              </div>
              <div className="icon-price-container">
                <SVG src={deleteIcon}></SVG>
                <div className="price">{item.price}$</div>
              </div>
              <div className="total">
                Total:<span>{item.price * item.quantity}$</span>
              </div>
            </div>
            <div className="image">
              <img className="img" src={item.image} />
            </div>
          </div>
        ))}
        <div className="total">
          Total Cart Price:<span>{totalCartPrice}$</span>
        </div>
      </div>
      <button
        className="btn"
        onClick={() => {
          navigate("/cart/viewcart");
        }}
      >
        VIEW SHOPPING CART
      </button>
    </div>
  );
};

export default CartContent;
