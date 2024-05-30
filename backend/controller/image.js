const connection = require("../models/db");

const addImageArrayByProductId = (req, res) => {
  const productId = req.params.productId;
  const { imageUrls } = req.body;

  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return res.status(400).json({ message: "Invalid imageUrls format" });
  }

  const sql = `INSERT INTO ProductImages (product_id, image_url) VALUES ?`;
  const values = imageUrls.map((imageUrl) => [productId, imageUrl]);

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error adding images:", err);
      return res.status(500).json({ message: "Failed to add images" });
    }
    console.log("Images added successfully");
    res.status(201).json({ message: "Images added successfully" });
  });
};

const updateImageByProductId = (req, res) => {
  const productId = req.params.productId;
  const { imageId, imageUrl } = req.body;
  const sql = `UPDATE ProductImages SET image_url=? WHERE id=? AND product_id=?`;
  connection.query(sql, [imageUrl, imageId, productId], (err, result) => {
    if (err) {
      console.error("Error updating image:", err);
      return res.status(500).json({ message: "Failed to update image" });
    }
    if (result.affectedRows > 0) {
      console.log("Image updated successfully");
      res.status(200).json({ message: "Image updated successfully" });
    } else {
      res.status(404).json({ message: "Image not found for the product" });
    }
  });
};

const deleteImageByProductId = (req, res) => {
  const productId = req.params.productId;
  const { imageId } = req.body;
  const sql = `DELETE FROM ProductImages WHERE id=? AND product_id=?`;
  connection.query(sql, [imageId, productId], (err, result) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ message: "Failed to delete image" });
    }
    if (result.affectedRows > 0) {
      console.log("Image deleted successfully");
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ message: "Image not found for the product" });
    }
  });
};

const getImageByProductId = (req, res) => {
  const productId = req.params.productId;
  const sql = `SELECT * FROM ProductImages WHERE product_id=?`;
  connection.query(sql, [productId], (err, results) => {
    if (err) {
      console.error("Error retrieving images:", err);
      return res.status(500).json({ message: "Failed to retrieve images" });
    }
    res.status(200).json({ images: results });
  });
};

module.exports = {
  addImageArrayByProductId,
  updateImageByProductId,
  deleteImageByProductId,
  getImageByProductId,
};
