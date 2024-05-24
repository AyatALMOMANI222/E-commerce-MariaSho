const connection = require("../models/db");
const jwt = require("jsonwebtoken");

const addToCart = (req, res) => {
  const cartId = req.token.cartId;
  const { product_id, color, size, quantity, price } = req.body;

  // Check if the product already exists in the cart
  const checkIfExistsQuery = `SELECT * FROM ProductCart WHERE product_id = ? AND cart_id = ? AND color = ? AND size = ? AND price = ?`;
  connection.query(
    checkIfExistsQuery,
    [product_id, cartId, color, size, price],
    (err, results) => {
      if (err) {
        console.error("Error checking if product exists in cart:", err);
        return res
          .status(500)
          .json({ message: "Failed to add product to cart" });
      }

      if (results.length > 0) {
        // Product already exists in the cart, update the quantity
        const existingProduct = results[0];
        const updatedQuantity = existingProduct.quantity + quantity;
        const updateQuery = `UPDATE ProductCart SET quantity = ? WHERE id = ?`;
        connection.query(
          updateQuery,
          [updatedQuantity, existingProduct.id],
          (updateErr) => {
            if (updateErr) {
              console.error(
                "Error updating product quantity in cart:",
                updateErr
              );
              return res
                .status(500)
                .json({ message: "Failed to update product quantity in cart" });
            }
            console.log("Product quantity updated in Cart successfully");
            res.status(200).json({
              message: `Product quantity updated in Cart successfully with cartId: ${cartId}`,
            });
          }
        );
      } else {
        // Product not in the cart, insert a new record
        const insertQuery = `INSERT INTO ProductCart(product_id, color, size, quantity, cart_id , price) VALUES (?, ?, ?, ?, ? , ?)`;
        connection.query(
          insertQuery,
          [product_id, color, size, quantity, cartId, price],
          (insertErr, result) => {
            if (insertErr) {
              console.error("Error adding product to cart:", insertErr);
              return res
                .status(500)
                .json({ message: "Failed to add product to cart" });
            }
            console.log("Product added to Cart successfully");
            res.status(201).json({
              result: result,
              message: `Product added to Cart successfully with cartId: ${cartId}`,
            });
          }
        );
      }
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

const updateQuantity = (req, res) => {
  const { cartItemId, operation } = req.body;

  // Check if the operation is either 'increment' or 'decrement'
  if (operation !== "increment" && operation !== "decrement") {
    return res.status(400).json({ message: "Invalid operation" });
  }

  let incrementValue = 1;
  if (operation === "decrement") {
    incrementValue = -1;
  }

  // Query the current quantity of the cart item
  const getQuantityQuery = `SELECT quantity FROM ProductCart WHERE id = ?`;
  connection.query(getQuantityQuery, [cartItemId], (err, results) => {
    if (err) {
      console.error("Error retrieving quantity from database:", err);
      return res.status(500).json({ message: "Failed to update quantity" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const currentQuantity = results[0].quantity;
    const updatedQuantity = currentQuantity + incrementValue;

    if (updatedQuantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    // Update the quantity in the database
    const updateQuantityQuery = `UPDATE ProductCart SET quantity = ? WHERE id = ?`;
    connection.query(
      updateQuantityQuery,
      [updatedQuantity, cartItemId],
      (updateErr) => {
        if (updateErr) {
          console.error("Error updating quantity in database:", updateErr);
          return res.status(500).json({ message: "Failed to update quantity" });
        }
        console.log("Quantity updated successfully");
        res.status(200).json({
          message: "Quantity updated successfully",
          newQuantity: updatedQuantity,
        });
      }
    );
  });
};

const deleteProductFromCart = (req, res) => {
  const cartId = req.token.cartId;
  const { product_id, size, color } = req.params;
  console.log("hed", product_id);
  console.log(size);
  const sql = `DELETE FROM ProductCart WHERE cart_id = ? AND product_id = ? AND size = ? AND color = ?`;

  connection.query(sql, [cartId, product_id, size, color], (err, result) => {
    if (err) {
      console.error("Error deleting product from cart:", err);
      return res
        .status(500)
        .json({ message: "Failed to delete product from cart" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found in cart",
        result,
        product_id: product_id || "hh",
        cartId,
        product_id,
        size,
        color,
      });
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
  connection.query(
    sql,
    [quantity || color || size, product_id, cartId],
    (err, result) => {
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
    }
  );
};

const getCartProduct = (req, res) => {
  const cartId = req.token.cartId;
  const sql =
    "SELECT ProductCart.*, Products.price ,Products.image ,Products.name FROM ProductCart INNER JOIN Products ON ProductCart.product_id = Products.id WHERE ProductCart.cart_id = ?";
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
  updateCartItem,
  updateQuantity,
};
