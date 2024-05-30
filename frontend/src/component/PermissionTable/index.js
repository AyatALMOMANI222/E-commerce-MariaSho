import React, { useEffect, useState } from "react";
import Table from "../Core Component/Table";
import Buttons from "../Core Component/Buttons";
import { useNavigate } from "react-router-dom";
import Popup from "../Core Component/Modal";
import Select from "../Core Component/Select";
import axios from "axios";
import Input from "../Core Component/Input";
import "./style.scss";
const PermissionTable = () => {
  const [data, setData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState(-1);
  const [userName, setUserName] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const token = localStorage.getItem("token");
  const headers = [
    { key: "id", label: "ID" },
    { key: "username", label: "Name" },

    { key: "actions", label: "Add Permission" },
    { key: "permission_list", label: "All Permission" },
  ];
  const options = [
    { value: "addProduct", label: "Add Product" },
    { value: "updateProduct", label: "Update Product" },
    { value: "deleteProduct", label: "Delete Product" },
    { value: "admin", label: "Admin" },
  ];
  const processData = (input) => {
    const result = input?.reduce((acc, user) => {
      const existingUser = acc?.find((item) => item.email === user.email);
      if (existingUser) {
        existingUser.permission_list.push(user.permission_name);
      } else {
        acc.push({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
          city: user.city,
          location: user.location,
          permission_list: [user.permission_name],
        });
      }
      return acc;
    }, []);
    return result;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://e-commerce-maria-sho.vercel.app/register/per");
        setData(() => {
          return processData(response?.data.users)?.map((item) => {
            return {
              ...item,
              permission_list: item.permission_list.map((item, index) => {
                return <span className="permission-item">{item}</span>;
              }),
              actions: (
                <div>
                  <Buttons
                    onClick={() => {
                      setOpen(true);
                      setUserID(item.id);
                    }}
                  >
                    Add Permission
                  </Buttons>
                </div>
              ),
            };
          });
        });

        console.log(response?.data);
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
  }, []);

  const fetchPermissions = async (id) => {
    try {
      const response = await axios.get(`https://e-commerce-maria-sho.vercel.app/per/${id}`);
      return response.data.permissions;
    } catch (error) {
      console.error("Error fetching Permission:", error);
      return [];
    }
  };
  const addPermission = (userId) => {
    axios
      .post(
        `https://e-commerce-maria-sho.vercel.app/per/${userId}`,
        { name: selectedOption, description: "desc" },
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
    <div className="add-permission-container">
      <div className="filter-users-container">
        <Input
          userName={userName}
          setUserName={setUserName}
          placeholder={"Search on User"}
        />
      </div>
      <div className="permission-table-container">
        <Table headers={headers} data={data} />
      </div>

      <Popup
        header={"Add Permission"}
        popupContent={
          <div className="add-permission-container">
            <div className="select-div">
              <Select
                options={options}
                value={selectedOption}
                setValue={setSelectedOption}
                label="Permission"
                placeholder="Select"
                required={true}
              />
            </div>
            <div className="actions-container">
              <Buttons onClick={() => setOpen(false)}>Cancel</Buttons>
              <Buttons
                onClick={() => {
                  addPermission(userID);
                }}
              >
                Save
              </Buttons>
            </div>
          </div>
        }
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default PermissionTable;
