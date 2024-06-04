const mysql = require("mysql2");
require("dotenv").config();

const connection= new Pool({
  connectionString: process.env.POSTGRES_URL,
})

connection.connect((err) => {
  if (err) {
    throw err;
   
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
