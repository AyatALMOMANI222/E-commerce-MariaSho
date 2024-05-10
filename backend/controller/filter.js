// const connection = require("../models/db");

// const getProductByFilter = (req, res) => {
//   // Pagination parameters
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const offset = (page - 1) * limit;

//   // Filtering parameters
//   const filters = [];
//   const params = [];

//   if (req.query.name) {
//     filters.push("name = ?");
//     params.push(req.query.name);
//   }
//   if (req.query.type) {
//     filters.push("type = ?");
//     params.push(req.query.type);
//   }

//   if (req.query.size) {
//     filters.push("sizes LIKE ?");
//     params.push("%" + req.query.size + "%");
//   }

//   if (req.query.color && req.query.color.split(",").length > 0) {
//     filters.push("colors LIKE ?");
//     params.push("%" + req.query.color + "%");
//   }

//   if (req.query.minPrice || req.query.maxPrice) {
//     let minPrice = req.query.minPrice || 0;
//     let maxPrice = req.query.maxPrice || 30;

//     filters.push("price BETWEEN ? AND ?");
//     params.push(minPrice, maxPrice);
//   }

//   let query = "SELECT * FROM Products";

//   if (filters.length > 0) {
//     query += " WHERE " + filters.join(" AND ");
//   }
// console.log({page});
//   query += ` LIMIT ?, ?`;
//   params.push(offset, limit);
//   console.log(query);

//   connection.query(query, params, (err, results) => {
//     if (err) {
//       console.error("Error fetching products:", err);
//       res.status(500).json({ error: "Internal server error", err });
//       return;
//     }
//     console.log(query);
//     res.json({results});
//   });
// };
// module.exports = { getProductByFilter };


const connection = require("../models/db");

const getProductByFilter = (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Filtering parameters
  const filters = [];
  const params = [];

  if (req.query.name) {
    filters.push("name = ?");
    params.push(req.query.name);
  }
  if (req.query.type) {
    filters.push("type = ?");
    params.push(req.query.type);
  }

  if (req.query.size) {
    filters.push("sizes LIKE ?");
    params.push("%" + req.query.size + "%");
  }

  if (req.query.color && req.query.color.split(",").length > 0) {
    filters.push("colors LIKE ?");
    params.push("%" + req.query.color + "%");
  }

  if (req.query.minPrice || req.query.maxPrice) {
    let minPrice = req.query.minPrice || 0;
    let maxPrice = req.query.maxPrice || 30;

    filters.push("price BETWEEN ? AND ?");
    params.push(minPrice, maxPrice);
  }

  let query = "SELECT * FROM Products";

  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  // Count query
  const countQuery = "SELECT COUNT(*) AS total FROM Products" + (filters.length > 0 ? " WHERE " + filters.join(" AND ") : "");

  connection.query(query + ` LIMIT ?, ?`, params.concat([offset, limit]), (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Internal server error", err });
      return;
    }
    
    connection.query(countQuery, params, (err, countResult) => {
      if (err) {
        console.error("Error counting products:", err);
        res.status(500).json({ error: "Internal server error", err });
        return;
      }
      
      const totalElements = countResult[0].total;
      
      res.json({ products: results, totalElement: totalElements });
    });
  });
};

module.exports = { getProductByFilter };

