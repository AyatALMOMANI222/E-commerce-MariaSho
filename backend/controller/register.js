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

    const sql = `INSERT INTO Users (username, email, password, country, city, profile_picture, location) VALUES (?, ?, ?, ?, ?, ?, ?)`;
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
        
        if (result.affectedRows > 0) {
          console.log("User created successfully");
          return res.status(201).json({
            message: "User created successfully",
            userId: result.insertId,
          });
        } else {
          return res.status(500).json({ message: "Failed to create user" });
        }
      }
    );
  });
};

module.exports = createUser;



const updateUserField = (req, res) => {
  const user_id = req.token.user_id; // نفترض أن لديك middleware لتجاوز وسائل التواصل الخاصة بالمستخدم (req.token)
  const { field, val } = req.body; // يجب أن ترسل الواجهة الأمامية field و val في الطلب

  // الحقول المسموح بها للتحديث
  const allowedFields = ['username', 'email', 'password', 'country', 'city', 'profile_picture', 'location'];

  // التحقق مما إذا كان الحقل الذي يُرسل قابل للتحديث
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: 'Invalid field' });
  }

  if (field === 'password') {
    // في حالة تحديث كلمة المرور، نقوم بتجزئتها وتحديث القيمة المجزئة في قاعدة البيانات
    bcrypt.hash(val, 10, (err, hashedPassword) => {
      if (err) {
        console.error(`Error hashing password:`, err);
        return res.status(500).json({ message: 'Failed to hash password' });
      }

      // استعدادا للتحديث في قاعدة البيانات
      const sql = `UPDATE Users SET ${field} = ? WHERE id = ?`;
      connection.query(sql, [hashedPassword, user_id], (err, result) => {
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
    });
  } else {
  const { field, val } = req.body;
    const sql = `UPDATE Users SET ${field} = ? WHERE id = ?`;
    connection.query(sql, [val, user_id], (err, result) => {
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
  }
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
const getAllUsersAndPermission = (req, res) => {
  const sql = `
  SELECT Users.id, Users.username, Users.email, Users.country, Users.city, Users.location, Permissions.name AS permission_name
  FROM Users
  LEFT JOIN UserPermissions ON Users.id = UserPermissions.user_id
  LEFT JOIN Permissions ON UserPermissions.permission_id = Permissions.id
  `;

  connection.query(sql, (err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Failed to fetch users" });
    }

    res.status(200).json({ users });
  });
};

const getUserById = (req, res) => {
  const user_id = req.token.user_id;
  const sql = "SELECT * FROM Users WHERE id = ?";
  connection.query(sql,[user_id], (err, users) => {
      if (err) {
          console.error("Error fetching users:", err);
          return res.status(500).json({ message: "Failed to fetch users" });
      }

      res.status(200).json({ users });
  });
};
const getProfilePictureById = (req, res) => {
  const user_id = req.token.user_id;
  const sql = "SELECT profile_picture FROM Users WHERE id = ?";
  connection.query(sql,[user_id], (err, users) => {
      if (err) {
          console.error("Error fetching users:", err);
          return res.status(500).json({ message: "Failed to fetch profile-picture" });
      }

      res.status(200).json({ users });
  });
};
// const deleteUserByID = (req, res) => {
//     const userId = req.params.id; // Assuming the user ID is passed as a route parameter
//     const sql = "DELETE FROM Users WHERE id = ?";
//     connection.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error("Error deleting user:", err);
//             return res.status(500).json({ message: "Failed to delete user" });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({ message: "User deleted successfully" });
//     });
// };
const updateUserById = (req, res) => {
  const user_id = req.token.user_id;
  const {
    username,
    email,
    country,
    city,
    profile_picture,
    location,
  } = req.body;

  // تشفير كلمة المرور
  // هناك خطأ في هذا الجزء من الكود، يجب أن تقوم بتشفير كلمة المرور في حالة تغييرها

  // بناء الاستعلام لتحديث بيانات المستخدم
  const sql = `
    UPDATE Users 
    SET 
      username = ?,
      email = ?,
      country = ?,
      city = ?,
      profile_picture = ?,
      location = ? 
    WHERE 
      id = ?`;

  // قيم الحقول المراد تحديثها
  const values = [
    username,
    email,
    country,
    city,
    profile_picture,
    location,
    user_id,
  ];

  // تنفيذ الاستعلام لتحديث بيانات المستخدم
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ message: "Failed to update user" });
    }

    // التحقق مما إذا تم تحديث أي سجلات
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

/////////////////////

/////////////////////
const updateProfilePicture = (req, res) => {
  const user_id = req.token.user_id;
  const { profile_picture } = req.body;

  // const newProfilePicturePath = `path_to_profile_picture_folder/${user_id}.jpg`;

  // تحديث مسار الصورة الشخصية في قاعدة البيانات
  const sql = `
    UPDATE Users 
    SET 
      profile_picture = ?
    WHERE 
      id = ?`;

  connection.query(sql, [profile_picture, user_id], (err, result) => {
    if (err) {
      console.error("Error updating profile picture:", err);
      return res.status(500).json({ message: "Failed to update profile picture" });
    }

    // التحقق مما إذا تم تحديث أي سجلات
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Profile picture updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

module.exports = {getAllUsersAndPermission ,getProfilePictureById,getUserById,createUser,updateUserField,getAllUsers,updateUserById,updateProfilePicture};
