const express = require("express");
const auth = require("../middlewear/authentication");
const authorization=require("../middlewear/authorization")
const {
  addProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
} = require("../controller/product");
const productRouter = express.Router();
productRouter.post("/", auth,authorization(["addproduct","admin"]), addProduct);
productRouter.get("/", auth, getAllProducts);
productRouter.put("/:productId", auth, updateProductById);
productRouter.delete("/:productId", auth, deleteProductById);
productRouter.get("/:productId", auth, getProductById);
module.exports = productRouter;
