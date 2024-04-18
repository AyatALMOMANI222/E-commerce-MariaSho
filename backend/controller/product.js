const connection = require("../models/db");
const addProduct = (req, res) => {
  const {
    name,
    image,
    description,
    price,
    sizes,
    colors,
    quantity,
    type,
    material,
    brand,
  } = req.body;

  const imageDataArray = req.body.images || []

  const sqlInsertProduct = `INSERT INTO Products (name,image, description, price, sizes,
    colors, quantity, type, material, brand) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

  connection.query(
    sqlInsertProduct,
    [
      name,
      image,
      description,
      price,
      sizes,
      colors,
      quantity,
      type,
      material,
      brand,
    ],
    (err, productResult) => {
      if (err) {
        console.error("Error adding product:", err);
        return res.status(500).json({ message: "Failed to add product" });
      }
      
      console.log("Product added successfully");
      const productId = productResult.insertId;

      // Prepare values for image insertion
      const values = imageDataArray.map((imageData) => [
        imageData.image_url,
        productId, // Use productId instead of imageData.product_id
      ]);
console.log(values);
      // Then, insert the images associated with the product
      const sqlInsertImage = `INSERT INTO ProductImages (image_url, product_id) VALUES ?`;
      connection.query(sqlInsertImage, [values], (err, imageResult) => {
        if (err) {
          console.error("Failed to add images:", err);
          return res.status(500).json({ message: "Failed to add images" });
        }
        
        console.log("Images added successfully");
        return res.status(201).json({
          message: "Product and images added successfully",
          productId: productId,
        });
      });
    }
  );
};

const getAllProducts = (req, res) => {
  const sql = "SELECT * FROM Products";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving products:", err);
      return res.status(500).json({ message: "Failed to retrieve products" });
    }
    res.status(200).json({ products: results });
  });
};

const getProductById = (req, res) => {
  const productId = req.params.productId;
  const sql = "SELECT * FROM Products WHERE id = ?";
  connection.query(sql, [productId], (err, results) => {
    if (err) {
      console.error("Error retrieving product details:", err);
      return res
        .status(500)
        .json({ message: "Failed to retrieve product details" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = results[0];
    res.status(200).json({ product });
  });
};

const updateProductById = (req, res) => {
  const productId = req.params.productId;
  const {
    name,
    image,
    description,
    price,
    sizes,
    colors,
    quantity,
    type,
    material,
    brand,
  } = req.body;
  const sql = `UPDATE Products SET 
      name=?,
      description=?,
      image=?,
      price=?,
      sizes=?,
      colors=?,
      quantity=?,
      type=?,
      material=?,
      brand=?
      WHERE id=?`;
  connection.query(
    sql,
    [
      name,
      image,
      description,
      price,
      sizes,
      colors,
      quantity,
      type,
      material,
      brand,
      productId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ message: "Failed to update product" });
      }
      res.status(200).json({ message: "Product updated successfully" });
    }
  );
};
const deleteProductById = (req, res) => {
  const productId = req.params.id;
  const sql = `DELETE FROM Products WHERE id=?`;
  connection.query(sql, [productId], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ message: "Failed to delete product" });
    }
    if (result.affectedRows > 0) {
      console.log("Product deleted successfully");
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
};

const getProductsByType = (req, res) => {
  const type = req.params.type;
  console.log(type);
  const sql = `SELECT * FROM Products WHERE type = ?`;
  connection.query(sql, [type], (err, results) => {
    if (err) {
      console.error("Error retrieving products by type:", err);
      res.status(500).json({ error: "Failed to retrieve products" });
    } else {
      console.log("Products retrieved successfully");
      res.json(results);
    }
  });
};

module.exports = {
  getProductsByType,
  addProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
};
