import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";
import "./style.scss";

const OrderItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="order-item-container">
      <div className="information">{item.id}</div>
      <div className="information">{item.order_date.split("T")[0]}</div>
      <div className="information">{item.status}</div>
      <div className="information">{item.total_amount}</div>
      <button
        className="information-btn"
        onClick={() => {
          navigate(`/orders/${item.id}`);
        }}
      >
        View
      </button>
    </div>
  );
};

const OrdersList = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalElement, setTotalElement] = useState(0);

  const getAllOrders = () => {
    axios
      .get(`http://localhost:5000/order/all/${pageNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data.results);

        
        setTotalElement(response.data.totalElements);
      })
      .catch((error) => {
        console.error("Error fetching Orders", error);
      });
  };

  useEffect(getAllOrders, [pageNum]);
  return (
    <div className="orders-container">
            {(orders.length == 0) ? <div className="no-order">No orders yet</div> :
              <div className="orders-list-container">
              <div className="header-list">
                <div className="information">Order ID</div>
                <div className="information">Order Date</div>
                <div className="information">Status</div>
                <div className="information">Price</div>
                <div className="information">Actions</div>
              </div>
      
              {orders.map((item) => {
                return <OrderItem item={item} />;
              })}
            </div>}
      <Pagination
        totalElements={totalElement}
        currentPage={pageNum}
        setCurrentPage={setPageNum}
      />

    
    </div>
  );
};

export default OrdersList;
