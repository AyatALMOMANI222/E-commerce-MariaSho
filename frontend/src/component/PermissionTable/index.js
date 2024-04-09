import React, { useState, useEffect } from "react";
import axios from "axios";
import UserManagement from "../userManagement";
import Dropdown from "../Core Component/DropDown";

import './style.scss';

const PermissionTable = () => {

  const [data, setData] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/register");
        setData(response?.data.users);

        const promises = response.data.users.map((user) => {
          return fetchPermissions(user.id).then((permission) => {
            return {
              id: user.id,
              permission: permission,
            };
          });
        });

        Promise.all(promises).then((results) => {
          const permissionsObject = {};
          results.forEach((result) => {
            permissionsObject[result.id] = result.permission;
          });
          setPermissions(permissionsObject);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [permissions]);

  const fetchPermissions = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/per/${id}`);
      return response.data.permissions;
    } catch (error) {
      console.error("Error fetching Permission:", error);
      return [];
    }
  };

  return (
    <div className="table-container">
      <div className="table">
        <h2>Permission Table</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>User ID</th>
              <th>Add Permissions</th>
              <th>Permission Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.id}</td>
                <td>
                  <button>hi</button>
                </td>
                <td>
                  {permissions[item.id] && permissions[item.id].map((element, index) => (
                    <span key={index}>{element.name}
                      {index !== permissions[item.id].length - 1 && ", "}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionTable;
