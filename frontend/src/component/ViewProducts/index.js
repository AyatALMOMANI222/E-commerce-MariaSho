import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSection from "../ProductSection/ProductSection";
import { useNavigate } from "react-router-dom";
import PageNav from "../pageNav";
import Categorey2 from "../Category2";
import Price from "../Price";
import Colors2 from "../color2";
import Size from "../SizeSection";
import "./style.scss";

const ViewProducts = () => {
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState({ min: 0, max: 50 });
  const [color, setColor] = useState("");
  const [product, setProduct] = useState([]);
  const [categorey, setCategorey] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const getProduct = () => {
    axios
      .get("http://localhost:5000/filter", {
        params: {
          page: pageNum, // Example: you can replace with actual values
          limit: 10, // Example: you can replace with actual values
          //   name: "yourNameValue", // Example: you can replace with actual values
          type: categorey, // Example: you can replace with actual values
          size: size, // Example: you can replace with actual values
          color: color, // Example: you can replace with actual values
          minPrice: price.min, // Example: you can replace with actual values
          maxPrice: price.max, // Example: you can replace with actual values
        },
      })
      .then((response) => {
        console.log(response?.data);
        setProduct(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };

  useEffect(() => {
    getProduct();
  }, [pageNum, size, color, categorey, price]);
  const handleClick = (itemID) => {
    navigate(`/singleProduct/${itemID}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setPageNum((prev) => {
          return prev + 1;
        });
        console.log("hhhhhhhhhh");
      }
    };
    const container = document.getElementById("main");
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="all-page">
      <div>
        <div className="sidebar-container">
          <button onClick={() => getProduct()}>save</button>
          <div className="container">
            <div className="name"> MARIASHOP</div>
          </div>
          <div className="filter-container">
            <div className="filter">
              <Categorey2 categorey={categorey} setCategorey={setCategorey} />
            </div>
            <div className="filter">
              <Price price={price} setPrice={setPrice} />
            </div>
            <div className="filter">
              <Colors2 color={color} setColor={setColor} />
            </div>
            <div className="filter">
              {/* <Size size={size} setSize={setSize} /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="pro">
        <PageNav />
        <div className="main-con">
          {product.map((item) => {
            return (
              <div
                className="view-products"
                onClick={() => handleClick(item.id)}
              >
                <ProductSection details={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
