const express = require("express");
const auth = require("../middlewear/authentication");
const authorization = require("../middlewear/authorization");
const {
  getProductsByPageAndFilter,
  addProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
  getProductsByType,
  getPro,
} = require("../controller/product");

const productRouter = express.Router();

productRouter.get("/page", getPro);

productRouter.post(
  "/",
  auth,
  authorization(["addProduct", "admin"]),
  addProduct
);

productRouter.put(
  "/:productId",
  auth,
  authorization(["updateProduct", "admin"]),
  updateProductById
);

productRouter.delete("/:id", auth, deleteProductById);

productRouter.get("/one/:productId", getProductById);

productRouter.get("/:type", getProductsByType);

productRouter.get("/", getAllProducts);

module.exports = productRouter;
