import React, { useState, useRef } from "react";
import SVG from "react-inlinesvg";
import linkIcon from "../../icons/linkIcon.svg";
import deleteIcon from "../../icons/deleteIcon.svg";
import "./style.scss";

const ImageUpload = ({
  errorMsg,
  required = true,
  label = "Upload File",
  allowedExtensions,
  inputValue,
  setInputValue,
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleDelete = () => {
    setInputValue("");
    setFileName("");
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = () => {
          setInputValue(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setInputValue("");
        alert(
          `Invalid file type. Allowed extensions are: ${allowedExtensions.join(
            ", "
          )}`
        );
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`image-upload-container`}>
      {label && (
        <div className="label-container">
          <span>{label}</span>
          {required && <span className="star">*</span>}
        </div>
      )}
      <div className="img-upload-container">
        <input
          ref={fileInputRef}
          type="file"
          className="upload-file"
          accept={allowedExtensions?.map((ext) => `.${ext}`).join(",")}
          onChange={handleChange}
        />
        <div
          className={`upload-img-container ${errorMsg ? "error-msg" : ""}`}
          onClick={handleClick}
        >
          <div className="placholder">
            {fileName ? (
              <span className="file-name">{fileName}</span>
            ) : (
              "Upload Img"
            )}
          </div>
          <SVG
            className="link-icon"
            src={linkIcon}
            data-id="LINK_ICON"
            height={20}
            width={20}
          />
        </div>
        {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
        {!!fileName ? (
          <div className="img-container">
            <img className="img" src={inputValue} />
            <div className="actions-container">
              {/* <SVG
                className="view-icon"
                src={viewIcon}
                height={20}
                width={20}
              /> */}
              <SVG
                className="delete-icon"
                src={deleteIcon}
                onClick={handleDelete}
                height={20}
                width={20}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageUpload;
