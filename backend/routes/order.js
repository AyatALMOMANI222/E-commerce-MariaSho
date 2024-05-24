const express = require("express");
const auth = require("../middlewear/authentication");
const {
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  getAllOrders
} = require("../controller/order");
const orderRouter = express.Router();
orderRouter.post("/", auth, createOrder);
orderRouter.put("/:orderId", auth, updateOrderStatus);
orderRouter.get("/all/:page", auth, getAllOrders);
orderRouter.get("/:order_id", auth, getOrdersByUserId);

module.exports = orderRouter;
