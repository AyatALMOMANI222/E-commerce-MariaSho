import React, { useState, useRef, useEffect } from "react";
import SVG from "react-inlinesvg";
import axios from "axios";
import deleteIcon  from "../../../icons/deleteIcon.svg";
import "./style.scss";

const ImageUploade = ({
  errorMsg,
  required = true,
  label = "Upload File",
  allowedExtensions,
  inputValue,
  setInputValue,
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);
  const token = localStorage.getItem("token");
  const handleDelete = () => {
    setInputValue("");
    setFileName("");
  };
  const getProfilePicture = () => {
    axios
      .get("https://e-commerce-maria-sho.vercel.app/register/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.users[0]);
        const data = result.data.users[0];
        setProfilePic((prev) => {
          return {
            ...prev,
            profile_picture: data.profile_picture,
          };
        });
      });
  };
  useEffect(() => {
    getProfilePicture();
  }, []);
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
      {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
   
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
          {/* <SVG
            className="link-icon"
            src={linkIcon}
            data-id="LINK_ICON"
            height={20}
            width={20}
          /> */}
        </div>
        {!!inputValue ? (
        <div className="img-container">
          <img
            className="img"
            src={inputValue}
            width={100}
            height={100}
            style={{ borderRadius: "px" }}
          />
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

export default ImageUploade;