import React from "react";
import SVG from "react-inlinesvg";
import { deleteIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";

const CartContent = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const totalCartPrice = cart?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const getCartProducts = () => {
    axios
      .get(`http://localhost:5000/cart/cartproduct`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCart(response.data.cart);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };

  const handleDelete = (productId, size, color) => {
    axios
      .delete(`http://localhost:5000/cart/del/${productId}/${size}/${color}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        getCartProducts();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleUpdateQuantity = (cartItemId, operation) => {
    axios
      .put(
        "http://localhost:5000/cart/quantity",
        {
          cartItemId: cartItemId,
          operation: operation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getCartProducts();
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  return (
    <div className="cart-content">
      <div className="cart-content-container">
        {cart?.map((item) => (
          <div className="one-product-section">
            <div>
              <img className="cart-img" src={item.image} />
            </div>
            <div className="description"> {item.name}</div>
            <div className="price">{item.price}$</div>
            <div className="quantity-container">
              <div className="quantity-section">
                <button
                  onClick={() => {
                    handleUpdateQuantity(item.id, "decrement");
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => {
                    handleUpdateQuantity(item.id, "increment");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="chip-container">
              <div className={`chip ${item.color}`}></div>
            </div>
            <div className="size-container">
              <div className={`size-chip`}>{item.size}</div>
            </div>
            <div className="delete-product">
              <SVG
                onClick={() =>
                  handleDelete(item.product_id, item.size, item.color)
                }
                src={deleteIcon}
              ></SVG>
            </div>
          </div>
        ))}
        <div className="total-price-text">
          Total Cart Price:<span>{totalCartPrice}$</span>
        </div>
      </div>

  
    </div>
  );
};

export default CartContent;
