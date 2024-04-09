import React, { useState } from 'react';
import axios from 'axios';

const UserManagement = ({ userId }) => {
  const token = localStorage.getItem('token');
  const [permission, setPermission] = useState('');

  const handleClick = () => { // تعديل الدالة لعدم احتياجها لمعرف المستخدم كوسماً مطلقاً
    console.log(permission);
    axios
      .post(
        `http://localhost:5000/per/${userId}`, // تمرير معرف المستخدم في الطلب
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
      <input value={permission} onChange={(e) => setPermission(e.target.value)} />
      <button onClick={handleClick}>Add</button> {/* استخدام الدالة handleClick بدون تمرير معرف المستخدم */}
    </div>
  );
};

export default UserManagement;
