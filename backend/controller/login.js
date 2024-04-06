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
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching user data.",
      });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "The email doesn't exist",
      });
      return;
    }

    const user = result[0];
    const permission = result?.map((item) => item?.permission_name);
    console.log(user);

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const userPayload = {
          user_id: user.id,
          username: user.username,
          email: user.email,
          profile_picture: user.profile_picture,
          permission: permission,
        };

        const userToken = jwt.sign(userPayload, process.env.SECRET);

        res.status(200).json({
          success: true,
          userToken,
          user_id: user.id,
          username: user.username,
          profile_picture: user.profile_picture,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "The password you’ve entered is incorrect",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while comparing passwords.",
      });
    }
  });
};

module.exports = login;
