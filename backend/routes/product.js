const express = require("express");
const auth = require("../middlewear/authentication");
const authorization = require("../middlewear/authorization");
const {
  addProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
  getProductsByType,
} = require("../controller/product");
const productRouter = express.Router();

// POST request to add a product
productRouter.post(
  "/",
  auth,
  authorization(["addProduct", "admin"]),
  addProduct
);

// PUT request to update a product by ID
productRouter.put(
  "/:productId",
  auth,
  authorization(["updateProduct", "admin"]),
  updateProductById
);

// DELETE request to delete a product by ID
productRouter.delete(
  "/:productId",
  auth,
  authorization(["deleteProduct", "admin"]),
  deleteProductById
);

// GET request to get details of a specific product by ID

// GET request to get products by type
productRouter.get("/:type", getProductsByType);

// GET request to get all products
productRouter.get("/", getAllProducts);
productRouter.get("/one/:productId", getProductById);

module.exports = productRouter;
