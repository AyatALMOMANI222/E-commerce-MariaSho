const connection = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT Users.id ,Users.username, Users.role_id,Roles.name  FROM Users 
   LEFT JOIN Users_Roles ON Users.id = Users_Roles.user_id 
   LEFT JOIN Roles ON Users_Roles.role_id = Roles.id
   WHERE Users.email=?`;
};
