const connection = require("../models/db");

const getProductByFilter = (req, res) => {
    const filteredProduct = req.params.filteredProduct; 

    const sql = `
        SELECT * 
        FROM Products 
        WHERE name LIKE '%${filteredProduct}%' 
        OR description LIKE '%${filteredProduct}%' 
        OR sizes LIKE '%${filteredProduct}%' 
        OR colors LIKE '%${filteredProduct}%' 
        OR type LIKE '%${filteredProduct}%' 
        OR material LIKE '%${filteredProduct}%' 
        OR brand LIKE '%${filteredProduct}%'
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error retrieving products:", err);
            return res.status(500).json({ message: "Failed to retrieve products" });
        }
        res.status(200).json({ products: results });
    });
}
