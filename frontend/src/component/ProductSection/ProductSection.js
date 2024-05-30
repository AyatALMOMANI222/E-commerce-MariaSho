import React, { useState } from "react";
import {
  editIcon,
  closeIcon,
  deleteIcon,
  heartIcon,
  starIcon,
  heart,
  cartIcon,
} from "../../icons";
import SVG from "react-inlinesvg";
import axios from "axios";
import EditProduct from "../EditProduct";
import { useNavigate } from "react-router-dom";
import RatingStars from "../Star";
import "./style.scss";
const ProductSection = ({
  getProduct,
  details,
  hasDeleteProduct,
  hasEditProduct,
  products,
  setProducts,
}) => {
  const navigate = useNavigate();
  const [fillIcon, setFillIcon] = useState("black");
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (id) => {
    navigate(`/categorey/${id}`);
  };

  const handleDeleteClick = (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    axios
      .delete(`https://e-commerce-maria-sho.vercel.app/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting Product", error);
      });
  };

  return (
    <div className="one-product-container">
      <div className="iconn">
        {hasEditProduct && (
          <SVG
            src={editIcon}
            width={17}
            height={17}
            onClick={() => setIsOpen(true)}
          ></SVG>
        )}
        {hasDeleteProduct && (
          <SVG
            src={closeIcon}
            width={17}
            height={17}
            onClick={() => {
              handleDeleteClick(details.id);
            }}
          ></SVG>
        )}
      </div>
      <div className="image-container" onClick={() => handleClick(details.id)}>
        <img src={details.image} className="image" />
      </div>

      <div className="second-section">
        <div className="title" onClick={() => handleClick(details.id)}>
          {details.title}
        </div>
        <div>{details.desc}</div>
        <div>{details.type}</div>

        <div className="prod-content">
          <div className="last">
            <div className="price">
              <del>{details.price}$</del> {details.price - 0.2 * details.price}
            </div>
            <SVG
              onClick={() => handleClick(details.id)}
              src={cartIcon}
              width={18}
              height={18}
            ></SVG>
          </div>
          <div className="right-side">
            <RatingStars rating={3} />
          </div>
        </div>
      </div>
      {isOpen && (
        <EditProduct
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editProductId={details.id}
        />
      )}
    </div>
  );
};

export default ProductSection;
