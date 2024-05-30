const connection = require("../models/db");
const addComment = (req, res) => {
  const user_id = req.token.user_id;
  const { product_id, parent_id, comment } = req.body;
  const sqlInsertProduct = `INSERT INTO comments ( product_id, user_id, parent_id,comment) VALUES (?,?, ?,?)`;
  connection.query(
    sqlInsertProduct,
    [product_id, user_id, parent_id, comment],
    (err, commentResult) => {
      if (err) {
        console.error("Error adding comment:", err);
        return res.status(500).json({ message: "Failed to add comment" });
      }
      console.log("Comment added successfully");
      const commentId = commentResult.insertId;
      return res.status(201).json({
        message: "Comment added successfully",
        commentId: commentId,
      });
    }
  );
};

const deleteCommentByCommentId = (req, res) => {
  const id = req.query.id;
  const sql = `DELETE FROM comments WHERE id = ? `;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting comment:", err);
      return res.status(500).json({ message: "Failed to delete comment", err });
    }
    if (result.affectedRows > 0) {
      console.log("Comment deleted successfully");
      res.status(200).json({ message: "Comment deleted successfully", result });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  });
};

const updateProductById = (req, res) => {
  const { id, comment } = req.body;
  const sql = `UPDATE comments SET comment=? WHERE id =?`;
  connection.query(sql, [comment, id], (err, result) => {
    if (err) {
      console.error("Error updating Comment:", err);
      return res.status(500).json({ message: "Failed to update Comment" });
    }
    res.status(200).json({ message: "Comment updated successfully" });
  });
};

const getCommentByProductId = (req, res) => {
  const productId = req.params.id;
  const sql =
    "SELECT comments.*, Users.username , Users.profile_picture FROM comments LEFT JOIN Users ON Users.id = comments.user_id LEFT JOIN Products ON Products.id = comments.product_id WHERE comments.product_id = ?; ";
  connection.query(sql, [productId], (err, results) => {
    if (err) {
      console.error("Error retrieving comment details:", err);
      return res
        .status(500)
        .json({ message: "Failed to retrieve comment details" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ results });
  });
};

module.exports = {
  getCommentByProductId,
  updateProductById,
  addComment,
  deleteCommentByCommentId,
};
