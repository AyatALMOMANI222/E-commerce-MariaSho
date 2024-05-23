import React from "react";
import SVG from "react-inlinesvg"
import "./style.scss";
const Comment = ({ item,icon ,handleDelete}) => {
  return (
    <div className="comment-container">

      <div className="comment">
    <div className="comment-icon-name">
  
        <div className="name-pic-container">
          <img
            className="img"
            src={
              item.profile_picture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKiKzU_n-AXx0Sel37AXZxb1lQkhiIt_kbdHVI1lJ6pQ&s"
            }
          />
          <div className="name">{item.username}</div>
        </div>
        <SVG onClick={handleDelete} width={16} height={16} src={icon}></SVG>
    </div>
        <div className="comment-text">
         {item.comment}
        </div>
      </div>
    </div>
  );
};

export default Comment;
