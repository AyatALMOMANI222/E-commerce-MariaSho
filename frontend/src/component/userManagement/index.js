import React, { useState } from "react";
import axios from "axios";

const UserManagement = ({ userId }) => {
  const token = localStorage.getItem("token");
  const [permission, setPermission] = useState("");

  const handleClick = () => {
    console.log(permission);
    axios
      .post(
        `https://e-commerce-maria-sho.vercel.app/per/${userId}`,
        { name: permission, description: "desc" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response?.data);
      })
      .catch((error) => {
        console.error("Error creating permission:", error);
      });
  };

  return (
    <div>
      <input
        value={permission}
        onChange={(e) => setPermission(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default UserManagement;
