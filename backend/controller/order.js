const connection = require("../models/db");

const createOrder = (req, res) => {
  const { user_id, cart_id } = req.body;

  // Step 1: Create an order
  const sqlInsertOrder =
    "INSERT INTO Orders (user_id, cart_id, total_amount, status) VALUES (?, ?, ?, ?)";
  connection.query(
    sqlInsertOrder,
    [user_id, cart_id, 0, "pending"],
    (error, orderResult) => {
      if (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Failed to create order" });
      }

      const orderId = orderResult.insertId;

      // Step 2: Get cart items
      const sqlGetCartItems = "SELECT * FROM ProductCart WHERE cart_id = ?";
      connection.query(sqlGetCartItems, [cart_id], (cartError, cartItems) => {
        if (cartError) {
          console.error("Error retrieving cart items:", cartError);
          return res
            .status(500)
            .json({ message: "Failed to retrieve cart items" });
        }

        // Calculate total_amount
        let total_amount = 0;
        if (cartItems.length > 0) {
          cartItems.forEach((cartItem) => {
            total_amount += cartItem.price * cartItem.quantity;
          });
        } else {
          // No items in the cart, set total_amount to 0
          total_amount = 0;
        }

        // Check if total_amount is NaN, set it to 0 in that case
        if (isNaN(total_amount)) {
          total_amount = 0;
        }

        // Update order with total_amount
        const sqlUpdateOrder =
          "UPDATE Orders SET total_amount = ? WHERE id = ?";
        connection.query(
          sqlUpdateOrder,
          [total_amount, orderId],
          (updateError) => {
            if (updateError) {
              console.error(
                "Error updating order with total amount:",
                updateError
              );
              return res
                .status(500)
                .json({ message: "Failed to update order with total amount" });
            }

            // Step 3: Create order products
            const insertOrderProductsQuery =
              "INSERT INTO OrderProduct (order_id, product_id, color, size, quantity, total_amount) VALUES (?, ?, ?, ?, ?, ?)";
            let insertPromises = [];
            cartItems.forEach((cartItem) => {
              insertPromises.push(
                new Promise((resolve, reject) => {
                  connection.query(
                    insertOrderProductsQuery,
                    [
                      orderId,
                      cartItem.product_id,
                      cartItem.color,
                      cartItem.size,
                      cartItem.quantity,
                      cartItem.price * cartItem.quantity,
                    ],
                    (insertError) => {
                      if (insertError) {
                        console.error(
                          "Error inserting order product:",
                          insertError
                        );
                        reject("Failed to create order products");
                      } else {
                        resolve();
                      }
                    }
                  );
                })
              );
            });

            Promise.all(insertPromises)
              .then(() => {
                // Step 4: Delete cart items
                const deleteCartItemsQuery =
                  "DELETE FROM ProductCart WHERE cart_id = ?";
                connection.query(
                  deleteCartItemsQuery,
                  [cart_id],
                  (deleteError) => {
                    if (deleteError) {
                      console.error("Error deleting cart items:", deleteError);
                      return res
                        .status(500)
                        .json({ message: "Failed to delete cart items" });
                    }
                    res
                      .status(201)
                      .json({ message: "Order created successfully", orderId });
                  }
                );
              })
              .catch((error) => {
                console.error("Error:", error);
                res.status(500).json({ message: error });
              });
          }
        );
      });
    }
  );
};

const updateOrderStatus = (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  const sql = "UPDATE Orders SET status = ? WHERE id = ?";
  const values = [status, orderId];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ message: "Failed to update order status" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully" });
  });
};
const getOrdersByUserId = async (req, res) => {
  const user_id = req.token.user_id;
  const order_id = req.params.order_id;

  const sql = `
      SELECT Orders.id AS order_id, Orders.total_amount AS order_total_amount, Orders.order_date, Orders.status,
             OrderProduct.id AS order_product_id, OrderProduct.product_id, OrderProduct.total_amount AS product_total_amount,
             OrderProduct.price, OrderProduct.color, OrderProduct.size, OrderProduct.quantity
      FROM Orders
      JOIN OrderProduct ON Orders.id = OrderProduct.order_id
      WHERE Orders.user_id = ? AND Orders.id = ?
  `;

  connection.query(sql, [user_id, order_id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve orders details" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json({ results });
  });
};

const getAllOrders = async (req, res) => {
  const user_id = req.token.user_id;
  const page = req.params.page;
  const limit = 10;
  const offset = (page - 1) * limit;

  const countQuery = `
    SELECT COUNT(*) AS total_orders
    FROM Orders
    WHERE user_id = ?
  `;

  // Execute the count query
  connection.query(countQuery, [user_id], (countErr, countResults) => {
    if (countErr) {
      return res.status(500).json({ message: "Failed to count orders" });
    }

    const totalElements = countResults[0].total_orders;
    const totalPages = Math.ceil(totalElements / limit); // Calculate total number of pages

    // Query to fetch paginated orders
    const sql = `
      SELECT *
      FROM Orders
      WHERE user_id = ?
      LIMIT ?, ?
    `;

    // Execute the paginated query
    connection.query(sql, [user_id, offset, limit], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to retrieve orders details" });
      }

      res
        .status(200)
        .json({ results, totalElements, totalPages, currentPage: page });
    });
  });
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrdersByUserId,
  getAllOrders,
};
