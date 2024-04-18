import React, { useState } from "react";
import ImageUpload from "../Core Component/UploadImage";
import Buttons from "../Core Component/Buttons";
import axios from "axios";
import Select from "../Core Component/Select";

const ImagesList = ({ productId, images, setImages }) => {
  const [loading, setLoading] = useState(false);
  const [imgArr, setImgArr] = useState([]);

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }

  const handleAddImage = () => {
    const newImage = { id: generateRandomId(), image_url: "" };
    setImages((prev) => [...prev, newImage]);
  };

  const handleDeleteImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const handleImageChange = (id, value) => {
    setImages((prev) =>
      prev.map((image) =>
        image.id === id ? { ...image, image_url: value } : image
      )
    );
  };

  const handleUploadImage = (img) => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/image/${productId}`, { imageUrl: img })
      .then((response) => {
        setLoading(false);
        console.log("Image added successfully:", response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error adding image:", error);
      });
  };
  return (
    <div className="images-list-container">
      {images.map((image) => (
        <div className="image-input-container" key={image.id}>
          <ImageUpload
            inputValue={image.image_url}
            setInputValue={(value) => handleImageChange(image.id, value)}
            label="Select Picture"
            allowedExtensions={["jpg", "jpeg", "png", "gif"]}
          />
          <Select
            label={"image color"}
            options={[
              { label: "Red", value: "red" },
              { label: "Blue", value: "blue" },
            ]}
            value={image?.color}
            setValue={(value) => {
              setImages((prev) =>
                prev.map((item) =>
                  image.id === item.id ? { ...image, color: value } : image
                )
              );
            }}
          />
          {images.length > 1 && (
            <Buttons onClick={() => handleDeleteImage(image.id)}>
              Delete
            </Buttons>
          )}
          <Buttons
            onClick={() => handleUploadImage(image.image_url)}
            disabled={!image.image_url || loading}
          >
            Upload
          </Buttons>
          {console.log(image.image_url)}
        </div>
      ))}
      <Buttons onClick={handleAddImage}>Add Image</Buttons>
    </div>
  );
};

export default ImagesList;
