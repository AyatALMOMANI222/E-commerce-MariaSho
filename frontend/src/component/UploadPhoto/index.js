import React, { useState } from "react";
import axios from "axios";
import ImageUploade from "../Core Component/UploadImage";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      console.log(file);
    }
  };

  const uploadImage = () => {
    if (!image) return;

   
    console.log(image);
    axios
      .put(
        "http://localhost:5000/register/pro",
        {  profile_picture :image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Image uploaded successfully:", response);
        console.log(response, "ayat");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div>
      <h2>Update Profile Picture</h2>
      <ImageUploade
            label="Upload Image"
            allowedExtensions={["jpg", "jpeg", "png", "gif"]}
            inputValue={image}
            setInputValue={setImage}
          />
      {image && (
        <div>
         
          <button onClick={uploadImage}>Upload Image</button>
        </div>
      )}
    </div>
  );
}
export default ImageUpload;
