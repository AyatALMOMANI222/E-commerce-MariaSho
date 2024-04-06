const connection=require("../models/db")

const getAvailableSizes = (req, res) => {
    const sql = "SELECT * FROM Sizes";
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching sizes:", err);
            return res.status(500).json({ message: "Failed to fetch sizes" });
        }
        res.status(200).json({ sizes: results });
    });
};


const addSize = (req, res) => {
    const { name } = req.body;
    const sql = "INSERT INTO Sizes (name) VALUES (?)";
    connection.query(sql, [name], (err, result) => {
        if (err) {
            console.error("Error adding size:", err);
            return res.status(500).json({ message: "Failed to add size" });
        }
        res.status(201).json({ message: "Size added successfully", sizeId: result.insertId });
    });
};
const removeSize = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM Sizes WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error removing size:", err);
            return res.status(500).json({ message: "Failed to remove size" });
        }
        res.status(200).json({ message: "Size removed successfully" });
    });
};
const getAvailableSizesForProduct = (req,res) => {
    const id =req.body
    const sql = `SELECT Sizes.name 
                 FROM Sizes
                 INNER JOIN ProductSizes ON Sizes.id = ProductSizes.size_id
                 WHERE ProductSizes.product_id = ?`;
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error retrieving available sizes for product:", err);
            return [];
        }
        const availableSizes = results.map((row) => row.name);
        return availableSizes;
    });
};

module.exports =  {getAvailableSizes,addSize,removeSize,getAvailableSizesForProduct} ;