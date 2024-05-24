const express = require("express");
const {
  updateQuantity,
  updateCartItem,
  getCartProduct,
  addToCart,
  getCartByCartId,
  deleteProductFromCart,
} = require("../controller/cart");
const auth = require("../middlewear/authentication");
const cartRouter = express.Router();
cartRouter.post("/", auth, addToCart);
cartRouter.get("/", auth, getCartByCartId);
cartRouter.get("/cartproduct", auth, getCartProduct);
cartRouter.delete("/del/:product_id/:size/:color", auth, deleteProductFromCart);
cartRouter.put("/", auth, updateCartItem);
cartRouter.put("/quantity", auth, updateQuantity);

module.exports = cartRouter;
