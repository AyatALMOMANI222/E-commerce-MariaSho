const connection = require("../models/db");
const jwt = require("jsonwebtoken");

const addToCart = (req, res) => {
  const cartId = req.token.cartId;

  const { product_id, color, size, quantity } = req.body;

  const sql = `INSERT INTO ProductCart(product_id, color, size, quantity, cart_id) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [product_id, color, size, quantity, cartId],
    (err, result) => {
      if (err) {
        console.error("Error creating cart:", err);
        return res.status(500).json({ message: "Failed to create cart" });
      }

      console.log("Product added to Cart successfully");
      
      res.status(201).json({
        result:result,
        message: `Product added to Cart successfully with cartId: ${cartId}`,
      });
    }
  );
};

const getCartByCartId = (req, res) => {
  const cartId = req.token.cartId;
  const sql = "SELECT * FROM ProductCart WHERE cart_id = ?";

  connection.query(sql, [cartId], (err, result) => {
    if (err) {
      console.error("Error retrieving cart:", err);
      return res.status(500).json({ message: "Failed to retrieve cart" });
    }

    res.status(200).json({
      message: "Cart retrieved successfully",
      cart: result,
    });
  });
};

const deleteProductFromCart = (req, res) => {
  const cartId = req.token.cartId;
  const product_id  = req.params.productId
  const sql = `DELETE FROM ProductCart WHERE cart_id = ? AND product_id = ?`;

  connection.query(sql, [ cartId, product_id], (err, result) => {
    if (err) {
      console.error("Error deleting product from cart:", err);
      return res
        .status(500)
        .json({ message: "Failed to delete product from cart" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    console.log("Product deleted from cart successfully");
    res.status(200).json({ message: "Product deleted from cart successfully" });
  });
};


const updateCartItem = (req, res) => {

  const { product_id, operation, quantity, color, size } = req.body;

  let sql;
  let message;

  switch (operation) {
    case "updateQuantity":
      sql = `UPDATE ProductCart SET quantity = ? WHERE cart_id  = ? AND  product_id= ?`;
      message = "Cart item quantity updated successfully";
      break;
    case "updateColor":
      sql = `UPDATE ProductCart SET color = ? WHERE cart_id= ? AND product_id = ?`;
      message = "Cart item color updated successfully";
      break;
    case "updateSize":
      sql = `UPDATE  ProductCart  SET size = ? WHERE product_id = ? AND cart_id = ?`;
      message = "Cart item size updated successfully";
      break;
    default:
      return res.status(400).json({ message: "Invalid operation" });
  }
  const cartId = req.token.cartId;
  connection.query(sql, [quantity || color || size, product_id, cartId], (err, result) => {
    if (err) {
      console.error(`Error updating cart item ${operation}:`, err);
      return res
        .status(500)
        .json({ message: `Failed to update cart item ${operation}` });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message });
    } else {
      console.log(err);
      res
        .status(404)
        .json({ message: `Cart item not found or user unauthorized` });
    }
  });
};

const getCartProduct = (req, res) => {
  const cartId = req.token.cartId;
  const sql = "SELECT ProductCart.*, Products.price ,Products.image FROM ProductCart INNER JOIN Products ON ProductCart.product_id = Products.id WHERE ProductCart.cart_id = ?";
  connection.query(sql, [cartId], (err, result) => {
    if (err) {
      console.error("Error fetching cartproduct:", err);
      return res.status(500).json({ message: "Failed to Fetch Product" });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      cart: result,
    });
  });
};


module.exports = {
  getCartProduct,
  addToCart,
  getCartByCartId,
  deleteProductFromCart,
  updateCartItem
  // updateCartItemQuantity,
  // updateCartItemColor,
  // updateCartItemSize,
};
