import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSection from "../ProductSection/ProductSection";
import { useNavigate } from "react-router-dom";
import PageNav from "../pageNav";
import Categorey2 from "../Category2";
import Price from "../Price";
import Colors2 from "../color2";
import Size from "../SizeSection";
import { useParams } from "react-router-dom";
import "./style.scss";

const ViewProducts = () => {
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState({ min: 0, max: 50 });
  const [color, setColor] = useState("");
  const [product, setProduct] = useState([]);
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const {type} = useParams()
  const [categorey, setCategorey] = useState(type);

  const parameter = {
    page: pageNum,
    limit: 10,
    //   name: "yourNameValue",
    type: categorey,
    size: size,
    color: color,
    minPrice: price.min,
    maxPrice: price.max,
  };
  const getProduct = () => {
    axios
      .get("http://localhost:5000/filter", {
        params: parameter,
      })
      .then((response) => {
        console.log(response?.data);
        setProduct((prev) => {
          return [...prev, ...response?.data];
        });
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };

  useEffect(() => {
    getProduct();
  }, [pageNum]);
  const handleClick = (itemID) => {
    navigate(`/singleProduct/${itemID}`);
  };

  useEffect(() => {
    setProduct([]);
    setPageNum(1);
    getProduct();
  }, [color, size, categorey, price]);

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
    console.log(container);
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="all-page">
      <div>
        <div className="sidebar-container">
          <div className="filter-radio-container">
            <div className="name"> MARIASHOP</div>
          </div>
          <hr className="horizental-line"/>
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
