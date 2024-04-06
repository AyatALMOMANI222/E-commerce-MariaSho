const connection = require("../models/db");

const addPermission = (req, res) => {
    const { name, description } = req.body;
    const user_id = req.token.user_id;
  console.log(req.token);
    const checkPermissionQuery = "SELECT * FROM UserPermissions WHERE user_id = ? AND permission_id IN (SELECT id FROM Permissions WHERE name = ?)";
    const checkPermissionData = [user_id, name];
  
    connection.query(checkPermissionQuery, checkPermissionData, (checkPermissionErr, checkPermissionResult) => {
      if (checkPermissionErr) {
        console.log(checkPermissionErr);
        return res.status(500).json({ message: "Failed to check user permission" });
      }
  
      if (checkPermissionResult.length > 0) {
        return res.status(400).json({ message: "User already has this permission" });
      }
  
      const addPermissionQuery = "INSERT INTO Permissions (name, description) VALUES (?, ?)";
      const addPermissionData = [name, description];
  
      connection.query(addPermissionQuery, addPermissionData, (addPermissionErr, addPermissionResult) => {
        if (addPermissionErr) {
            // console.log(addPermissionErr);
          return res.status(500).json({ message: "Failed to add permission" });
        }
  
        const permission_id = addPermissionResult.insertId;
  
        const addUserPermissionQuery = "INSERT INTO UserPermissions (permission_id, user_id) VALUES (?, ?)";
        const addUserPermissionData = [permission_id, user_id];
  
        connection.query(addUserPermissionQuery, addUserPermissionData, (addUserPermissionErr, addUserPermissionResult) => {
          if (addUserPermissionErr) {
            // console.log(addUserPermissionErr);
            // console.log("rrrrrrrrrrr");
            return res.status(500).json({ message: "Failed to add user permission" });
          }
  
          res.status(201).json({
            message: "Permission added successfully",
            permission_id: permission_id,
          });
         
        });
      });
    });

  };
  


  
  


module.exports = addPermission
// 