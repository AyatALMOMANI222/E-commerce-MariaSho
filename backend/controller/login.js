const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../models/db");

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received for email:", email);

  const query = `
    SELECT Users.id AS id, Users.username, Users.password,
    Permissions.name AS permission_name, Cart.id AS cartId
    FROM Users 
    LEFT JOIN UserPermissions ON Users.id = UserPermissions.user_id
    LEFT JOIN Permissions ON UserPermissions.permission_id = Permissions.id
    LEFT JOIN Cart ON Users.id = Cart.user_id
    WHERE Users.email = ? AND (Cart.isDeleted IS NULL OR Cart.isDeleted != 1)`;

  const data = [email];
  connection.query(query, data, async (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching user data.",
      });
    }

    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "The email doesn't exist",
      });
    }

    const user = result[0];
    const permissions = result?.map((item) => item?.permission_name);
    console.log({ user, permissions });

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const userPayload = {
          user_id: user.id,
          username: user.username,
          email: user.email,
          permission: permissions,
          cartId: user.cartId,
        };
        const userToken = jwt.sign(userPayload, process.env.SECRET);

        console.log("User payload:", userPayload);
        console.log("Generated token:", userToken);

        return res.status(200).json({
          success: true,
          userToken,
          user_id: user.id,
          username: user.username,
          permission: permissions,
          cartId: userPayload.cartId,
        });
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
