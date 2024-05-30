import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.scss";

const OrderDetails = () => {
  const { order_id } = useParams();
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  const getOrderDetails = () => {
    axios
      .get(`http://localhost:5000/order/${order_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setProducts(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching Orders", error);
      });
  };

  useEffect(() => {
    getOrderDetails();
  }, []); // Empty dependency array to execute once on component mount

  return (
    <div>
      <div className="order-list">
        {products.map((order) => (
          <div key={order.order_product_id} className="order-item">
            <div className="order-details">
              <p>Order ID: {order.order_id}</p>
              <p>
                Total Amount: ${parseFloat(order.order_total_amount).toFixed(2)}
              </p>
              <p>Date: {new Date(order.order_date).toLocaleString()}</p>
              <p>Status: {order.status}</p>
            </div>
            <div className="product-details">
              <p>Product ID: {order.product_id}</p>
              <p>
                Total Amount: $
                {parseFloat(order.product_total_amount).toFixed(2)}
              </p>
              <p>Price: ${order.price}</p>
              <p>Color: {order.color}</p>
              <p>Size: {order.size}</p>
              <p>Quantity: {order.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
