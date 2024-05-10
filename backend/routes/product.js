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
  "/:id",
  auth,
  deleteProductById
);

// GET request to get details of a specific product by ID
productRouter.get("/one/:productId", getProductById);

// GET request to get products by type
productRouter.get("/:type", getProductsByType);

// GET request to get all products
productRouter.get("/", getAllProducts);

module.exports = productRouter;
