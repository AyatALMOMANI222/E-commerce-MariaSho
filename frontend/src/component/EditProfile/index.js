import React, { useEffect, useState } from "react";
import Input from "../Core Component/Input";
import Buttons from "../Core Component/Buttons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ImageUploade from "../Core Component/UploadImage";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    country: "",
    city: "",
    location: "",
  });
  const [image, setImage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUserData = () => {
    axios
      .get("http://localhost:5000/register/id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.users[0]);
        const data = result.data.users[0];
        console.log(data.profile_picture);
        setImage(data.profile_picture)
        setUserInfo((prev) => {
          return {
            ...prev,
            email: data.email,
            username: data.username,
            country: data.country,
            city: data.city,
            location: data.location,
          };
        });
      });
  };
 
  useEffect(() => {
    getUserData();
  }, []);

  const handleClick = () => {
    axios
      .put(
        "http://localhost:5000/register",
        { ...userInfo, profile_picture: image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response?.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error Login:", error);
      });
  };

  return (
    <div className="edit-container">
      <div className="left-dev">
        <div className="first-sentence">Edit your Profile</div>
        <div className="input-container">
          <div className="section-one">
            <Input
              classname="info-input"
              label={"username"}
              name="username"
              placeholder="username"
              value={userInfo.username}
              onChange={handleChange}
            />
          </div>
    
          <div className="second-section">
            <Input
              classname="info-input"
              label={"country"}
              name="country"
              placeholder="country"
              value={userInfo.country}
              onChange={handleChange}
            />
            <Input
              classname="info-input"
              label={"city"}
              name="city"
              placeholder="city"
              value={userInfo.city}
              onChange={handleChange}
            />
          </div>
          
          <div className="third-section">
            <Input
              classname="info-input"
              label={"email"}
              name="email"
              placeholder="email"
              value={userInfo.email}
              onChange={handleChange}
            />
            <Input
              classname="info-input"
              label={"location"}
              name="location"
              placeholder="location"
              value={userInfo.location}
              onChange={handleChange}
            />
            <ImageUploade
              label="Edit Profile Picture"
              allowedExtensions={["jpg", "jpeg", "png", "gif"]}
              inputValue={image}
              setInputValue={setImage}
              className="edit-picture"
            />
          </div>

          <Buttons className="edit-btn" onClick={handleClick}>
            Edit your Profile
          </Buttons>
        </div>
      </div>
      <div className="picture-container">
        <div className="profile-dev"></div>
        <img
          className="img"
          src={image || "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
          width={200}
          height={200}
          style={{ borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
