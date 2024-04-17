import React, { useState } from "react";
import ImageUpload from "../Core Component/UploadImage";
import Buttons from "../Core Component/Buttons";
import axios from "axios";

const ImagesList = ({ productId, images, setImages }) => {
  const [loading, setLoading] = useState(false);
  const [imgArr, setImgArr] = useState([]);

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }

  const handleAddImage = () => {
    const newImage = { id: generateRandomId(), img: "" };
    setImages((prev) => [...prev, newImage]);
  };

  const handleDeleteImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const handleImageChange = (id, value) => {
    setImages((prev) =>
      prev.map((image) => (image.id === id ? { ...image, img: value } : image))
    );
  };
  images.map((item, index) => {
   return
    setImgArr((prev) => {
      return [...prev, item.img]; // يجب إرجاع القيمة الجديدة لحالة imgArr
    });
  })
  

  const handleUploadImage = (img) => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/image/${productId}`, { imageUrl:img})
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
            inputValue={image.img}
            setInputValue={(value) => handleImageChange(image.id, value)}
            label="Select Picture"
            allowedExtensions={["jpg", "jpeg", "png", "gif"]}
          />
          {images.length > 1 && (
            <Buttons onClick={() => handleDeleteImage(image.id)}>
              Delete
            </Buttons>
          )}
          <Buttons
            onClick={() => handleUploadImage( image.img)}
            disabled={!image.img || loading}
          >
            Upload
          </Buttons>
          {console.log(image.img)}
        </div>
      ))}
      <Buttons onClick={handleAddImage}>Add Image</Buttons>
    </div>
  );
};

export default ImagesList;
