import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import closeIcon from "../../icons/close.svg";
import editIcon from "../../icons/editIcon.svg";
import axios from "axios";
import EditProduct from "../EditProduct";
import ProductCard from "../Core Component/Card";
import "./style.scss";

const AllProduct = () => {
    const [product, setProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  
useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        console.log(response?.data.products);
        setProduct(response?.data.products);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);

  const token = localStorage.getItem("token");

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting Product", error);
      });
  };

  const handleEditClick = (productId) => {
    setEditProductId(productId);
    setIsOpen(!isOpen); // تعيين معرف المنتج المحدد للتحرير
  };

  return (
          <div className="one-product-container">
        {product?.map((item) => {
          return (
            <div key={item.id} className="product">
              <div className="header">
                <div className="iconn">
                  <SVG
                    src={editIcon}
                    width={24}
                    height={24}
                    onClick={() => handleEditClick(item.id)}
                  ></SVG>
                  <SVG
                    src={closeIcon}
                    onClick={() => deleteProduct(item.id)}
                  ></SVG>
                </div>
              </div>
              <div className="card-container">
                <ProductCard
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  sizes={item.sizes}
                  colors={item.colors}
                  quantity={item.quantity}
                  type={item.type}
                  material={item.material}
                  brand={item.brand}
                  image={item.image}
                  buttonName="Add to Cart"
                />
              </div>
              {editProductId === item.id && isOpen && (
                <EditProduct
                  editProductId={editProductId}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              )}
              {/* <ImagesList
                productId={item.id}
                images={images}
                setImages={setImages}
              /> */}
            </div>
          );
        })}
      {/* </div> */}
    </div>
  )
}

export default AllProduct
