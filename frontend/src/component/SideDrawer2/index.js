import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import cartIcon from "../../icons/cartIcon.svg";
import { deleteIcon } from "../../icons";
import "./style.scss";
import ColorsSection from "../ColorsSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CartContent = ({cart,setCart}) => {
  // const [cartPro, setCartPro] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
 
  const calculateTotalPrice = (price, quantity) => {
    let totalPrice = 0;
    cart?.forEach((product) => {
      totalPrice += price * quantity;
    });
    return totalPrice;
  };

  const totalCartPrice = cart?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const getPro = () => {
    const token = localStorage.getItem('token'); // تأكد من استخدام الاسم الصحيح للمفتاح 'token'
    axios
    .get(`http://localhost:5000/cart/cartproduct`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.cart);
setCart(response.data.cart)
    })
    .catch((error) => {
      console.error("Error fetching Product", error);
    });
  };
  const handleDelete = (productId) => {
    const token = localStorage.getItem('token'); // تأكد من استخدام الاسم الصحيح للمفتاح 'token'
  
    axios
      .delete(
        `http://localhost:5000/cart/del/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then((response) => {
        console.log(response?.data);
        getPro()
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  

  return (
    <div className="popup-container">
      <div className="first-container">
        <div className="name-icon">
          {/* <div className="name">MariaShop {detail[0].type}</div> */}
          <SVG src={cartIcon} width={24} height={24}></SVG>
        </div>
      </div>

      <div>
        {cart?.map((item) => (
          <div className="product-picture">
            <div className="desc-color">
              <div className="desc">MariaShop {item.description}</div>
              <div className="color-qty">
                <div className={`chip ${item.color}`}></div>
                <div>{item.quantity}</div>
              </div>

              <div className="icon-price-container">
                <SVG onClick={()=>handleDelete(item.product_id)} src={deleteIcon}></SVG>
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
