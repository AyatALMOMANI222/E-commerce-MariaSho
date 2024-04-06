const connection = require("../models/db");
const addProduct = (req, res) => {
  const {
    name,

    description,
    price,
    sizes,
    colors,
    quantity,
    comment,
    type,
    material,
    brand
  } = req.body;

  const sqlInsertProduct = `INSERT INTO Products (name, description, price, sizes,
    colors, quantity, comment, type, material, brand) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
  connection.query(
    sqlInsertProduct,
    [name, description, price, sizes,
      colors, quantity, comment, type, material, brand],
    (err, result) => {
      if (err) {
        console.log(err);
        console.error("Error adding product:", err);
        return res.status(500).json({ message: "Failed to add product" });
      }
      console.log("Product added successfully");
      const productId = result.insertId;
 
    //   const sqlInsertAttributes = `INSERT INTO ProductAttributes (product_id, color_id, size_id) VALUES (?, ?, ?)`;
   
    //   if (!sizes || !Array.isArray(sizes) || !colors || !Array.isArray(colors)) {
    //     return res.status(400).json({ message: "Invalid or missing sizes or colors" });
    //   }
    //  sizes.forEach(size => {
    //     colors.forEach(color => {
    //       connection.query(
    //         sqlInsertAttributes,
    //         [productId, color, size],
    //         (err, result) => {
    //           if (err) {
    //             console.error("Error adding product attributes:", err);
    //             return res.status(500).json({ message: "Failed to add product attributes" });
    //           }
    //           console.log("Product attributes added successfully");
    //         }
    //       );
    //     });
    //   });

      res.status(201).json({
        message: "Product added successfully",
        productId: productId,
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
      return res.status(500).json({ message: "Failed to retrieve product details" });
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
      size,
      colors,
      quantity,
      comment,
      type,
      material,
      brand,
    } = req.body;
    const sql = `UPDATE Products SET 
      name=?,
      image=?,
      description=?,
      price=?,
      size=?,
      colors=?,
      quantity=?,
      comment=?,
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
        size,
        colors,
        quantity,
        comment,
        type,
        material,
        brand,
        productId 
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
   const deleteProductById=(req,res)=>{
    const productId=req.params.productId
    const sql =`DELETE FROM Products WHERE id=?`
    connection.query(sql,[productId],(err,result)=>{
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
    })
   }

module.exports = { addProduct, getAllProducts ,updateProductById,deleteProductById ,getProductById };
