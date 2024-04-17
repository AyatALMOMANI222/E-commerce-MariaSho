const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../models/db");

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `
    SELECT Users.id AS id, Users.username, Users.password 
    , Permissions.name AS permission_name
    FROM Users 
    LEFT JOIN UserPermissions ON Users.id = UserPermissions.user_id
    LEFT JOIN Permissions ON UserPermissions.permission_id = Permissions.id
    WHERE Users.email = ?`;

  const data = [email];
  connection.query(query, data, async (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching user data.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "The email doesn't exist",
      });
    }

    const user = result[0];
    const permission = result?.map((item) => item?.permission_name);

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const userPayload = {
          user_id: user.id,
          username: user.username,
          email: user.email,
          permission: permission,
        };
        const userToken = jwt.sign(userPayload, process.env.SECRET);
        return res.status(200).json({
          success: true,
          userToken,
          user_id: user.id,
          username: user.username,
          permission: user.permission_name,

        });
        console.log(user_id);
      } else {
        return res.status(403).json({
          success: false,
          message: "The password you’ve entered is incorrect",
        });
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while comparing passwords.",
      });
    }
  });
};

module.exports = login;
