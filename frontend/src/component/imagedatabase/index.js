import React, { useState } from "react";
import saveImage from "./indexedDB";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("الرجاء تحديد ملف");
      return;
    }

    try {
      await saveImage(selectedFile); 
      alert("تم تحميل الصورة بنجاح.");
    } catch (error) {
      console.error("خطأ أثناء تحميل الصورة:", error);
      alert("حدث خطأ أثناء تحميل الصورة.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>تحميل الصورة</button>
    </div>
  );
}

export default ImageUploader;
