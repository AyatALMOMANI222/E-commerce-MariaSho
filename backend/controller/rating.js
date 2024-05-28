const connection = require("../models/db");

const addOrUpdateRating = async (req, res) => {
  const userId = req.token.user_id;
  const { productId, rate } = req.body;

  try {
    // Check if the user has already rated the product
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM ratings WHERE user_id = ? AND product_id = ?", [
        userId,
        productId,
      ]);

    if (rows.length > 0) {
      // Update the existing rating
      await connection
        .promise()
        .query(
          "UPDATE ratings SET rating = ? WHERE user_id = ? AND product_id = ?",
          [rate, userId, productId]
        );
      res.status(200).json({ message: "Rating updated successfully" });
    } else {
      // Create a new rating
      await connection
        .promise()
        .query(
          "INSERT INTO ratings (user_id, product_id, rating) VALUES (?, ?, ?)",
          [userId, productId, rate]
        );
      res.status(201).json({ message: "Rating added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
const getAvgRating = (req, res) => {
  const product_id = req.params.product_id;
  const sql = "SELECT avg(rating) FROM ratings WHERE product_id = ?";

  connection.query(sql, [product_id], (err, result) => {
    if (err) {
      console.error("Error retrieving rate:", err);
      return res.status(500).json({ message: "Failed to retrieve rate" });
    }

    res.status(200).json({
      message: "rate retrieved successfully",
      rate: result,
    });
  });
};

const getUserRating = (req, res) => {
  const userId = req.token.user_id;
  const productId = req.params.product_id; // Assuming product_id is also required to uniquely identify the rating

  const sql = "SELECT rating FROM ratings WHERE user_id = ? AND product_id = ?";

  connection.query(sql, [userId, productId], (err, result) => {
    if (err) {
      console.error("Error retrieving user rating:", err);
      return res
        .status(500)
        .json({ message: "Failed to retrieve user rating" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Rating not found for the specified user and product",
      });
    }

    res.status(200).json({
      message: "User rating retrieved successfully",
      userRating: result[0].rating,
    });
  });
};

module.exports = { getAvgRating, addOrUpdateRating, getUserRating };
