const connection = require("../models/db");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  const {
    username,
    email,
    country,
    city,
    password,
    profile_picture,
    location,
  } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Failed to create user" });
    }

    const sql = `INSERT INTO Users (username, email,password, country, city, profile_picture,location) VALUES ( ?, ?, ?, ?, ?, ?, ? )`;
    connection.query(
      sql,
      [
        username,
        email,
        hashedPassword,
        country,
        city,
       
        profile_picture,
       
        location,
      ],
      (err, result) => {
        if (err) {
          console.error("Error creating user:", err);
          return res.status(500).json({ message: "Failed to create user" });
        }
        console.log("User created successfully");
        res.status(201).json({
          message: "User created successfully",
          userId: result.insertId,
        });
      }
    );
  });
};

const updateUserField = (req, res) => {
  const user_id = req.token.user_id;
  const { field, value } = req.body;
  const allowedFields = ['username', 'email', 'password', 'country', 'city', 'profile_picture', 'location'];
  if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: 'Invalid field' });
  }

  const sql = `UPDATE Users SET ${field} = ? WHERE id = ?`;
  connection.query(sql, [value, user_id], (err, result) => {
      if (err) {
          console.error(`Error updating ${field}:`, err);
          return res.status(500).json({ message: `Failed to update ${field}` });
      }

      if (result.affectedRows > 0) {
          res.status(200).json({ message: `${field} updated successfully` });
      } else {
          res.status(404).json({ message: `User not found` });
      }
  });
};
const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM Users";
  connection.query(sql, (err, users) => {
      if (err) {
          console.error("Error fetching users:", err);
          return res.status(500).json({ message: "Failed to fetch users" });
      }

      res.status(200).json({ users });
  });
};

const deleteUserByID = (req, res) => {
  const userId = req.params.id; 
  const sql = "DELETE FROM Users WHERE id = ?";
  connection.query(sql, [userId], (err, result) => {
      if (err) {
          console.error("Error deleting user:", err);
          return res.status(500).json({ message: "Failed to delete user" });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
  });
};

module.exports = {createUser,updateUserField,getAllUsers,deleteUserByID};
