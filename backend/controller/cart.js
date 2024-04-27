const connection = require("../models/db");

const addToCart = (req, res) => {
    const user_id = req.token.user_id;
    const { product_id, quantity, size, color } = req.body;
    const sql = `INSERT INTO Cart (user_id, product_id, quantity, size, color) VALUES (?, ?, ?, ?, ?)`;
    
    connection.query(sql, [user_id, product_id, quantity, size, color], (err, result) => {
        if (err) {
            console.error("Error creating cart:", err);
            return res.status(500).json({ message: "Failed to create cart" });
        }
        console.log("Cart created successfully");
        res.status(201).json({
            message: "Cart created successfully",
            cartId: result.insertId,
        });
    });
};



const getCartByUserId = (req, res) => {
    const user_id = req.token.user_id;
  const sql = "SELECT * FROM Cart WHERE user_id = ?";
  
  connection.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Error retrieving cart:", err);
      return res.status(500).json({ message: "Failed to retrieve cart" });
    }
    
    res.status(200).json({
      message: "Cart retrieved successfully",
      cart: result
    });
  });
};



const deleteCartByUserId = (req, res) => {
    const user_id = req.token.user_id;
    const sql = `DELETE FROM Cart WHERE user_id = ?`;
    
    connection.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error("Error deleting cart:", err);
            return res.status(500).json({ message: "Failed to delete cart" });
        }
        console.log("Cart deleted successfully");
        res.status(200).json({ message: "Cart deleted successfully" });
    });
};

const deleteProductFromCart = (req, res) => {
    const user_id = req.token.user_id;
    const { product_id } = req.body;
    const sql = `DELETE FROM Cart WHERE user_id = ? AND product_id = ?`;
    
    connection.query(sql, [user_id, product_id], (err, result) => {
        if (err) {
            console.error("Error deleting product from cart:", err);
            return res.status(500).json({ message: "Failed to delete product from cart" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        console.log("Product deleted from cart successfully");
        res.status(200).json({ message: "Product deleted from cart successfully" });
    });
};


const updateCartItemQuantity = (req, res) => {
    const user_id = req.token.user_id;
    const { id, quantity } = req.body;

    const sql = `UPDATE Cart SET quantity = ? WHERE id = ? AND user_id = ?`;
    connection.query(sql, [quantity, id, user_id], (err, result) => {
        if (err) {
            console.error("Error updating cart item quantity:", err);
            return res.status(500).json({ message: "Failed to update cart item quantity" });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Cart item quantity updated successfully" });
        } else {
            res.status(404).json({ message: "Cart item not found or user unauthorized" });
        }
    });
};


const updateCartItemColor = (req, res) => {
    const user_id = req.token.user_id;
    const { id, color } = req.body;

    const sql = `UPDATE Cart SET color = ? WHERE id = ? AND user_id = ?`;
    connection.query(sql, [color, id, user_id], (err, result) => {
        if (err) {
            console.error("Error updating cart item color:", err);
            return res.status(500).json({ message: "Failed to update cart item color" });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Cart item color updated successfully" });
        } else {
            res.status(404).json({ message: "Cart item not found or user unauthorized" });
        }
    });
};


const updateCartItemSize = (req, res) => {
    const user_id = req.token.user_id;
    const { id, size } = req.body;

    const sql = `UPDATE Cart SET size = ? WHERE id = ? AND user_id = ?`;
    connection.query(sql, [size, id, user_id], (err, result) => {
        if (err) {
            console.error("Error updating cart item size:", err);
            return res.status(500).json({ message: "Failed to update cart item size" });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Cart item size updated successfully" });
        } else {
            res.status(404).json({ message: "Cart item not found or user unauthorized" });
        }
    });
};


const getCartProduct = (req, res) => {
    const user_id = req.token.user_id;
  const sql = "SELECT * FROM Products INNER JOIN Cart ON Products.id = Cart.product_id WHERE user_id = ?";
  
  connection.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Error fetching cartproduct:", err);
      return res.status(500).json({ message: "Failed to Fetching Product" });
    }
    
    res.status(200).json({
      message: "Product fetching successfully",
      cart: result
    });
  });
};

module.exports = {getCartProduct,addToCart,getCartByUserId,deleteCartByUserId ,deleteProductFromCart,updateCartItemQuantity,updateCartItemColor,updateCartItemSize};
