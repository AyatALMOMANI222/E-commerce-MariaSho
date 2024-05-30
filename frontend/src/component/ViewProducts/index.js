import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSection from "../ProductSection/ProductSection";
import { useNavigate } from "react-router-dom";
import PageNav from "../pageNav";
import Categorey2 from "../Category2";
import Price from "../Price";
import Colors2 from "../color2";
// import Size from "../SizeSection";
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
  const { type } = useParams();
  const [categorey, setCategorey] = useState(type);
  const [isPermission, setIsPermission] = useState(false);
  const [perArr, setPerArr] = useState([]);

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
        page: pageNum,
        limit: 10,
        //   name: "yourNameValue",
        type: categorey,
        size: size,
        color: color,
        minPrice: price.min,
        maxPrice: price.max,
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

  const getPermission = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    axios
      .get(`http://localhost:5000/per/${user_id}`)
      .then((response) => {
        console.log(response?.data);
        const per = response?.data.hasPermission;
        const perArr = response?.data.permissions;
        setPerArr(perArr);
        setIsPermission(per);
        console.log(isPermission);
      })
      .catch((error) => {
        console.error("Error fetching Permission", error);
      });
  };

  const checkPermission = (perArr, permission) => {
    const hasPermission = perArr?.some((per) => {
      return per.name === permission;
    });
    return hasPermission;
  };

  useEffect(() => {
    getPermission();
    getProduct();
  }, [pageNum]);

  const hasAddProduct = checkPermission(perArr, "addProduct");
  const hasDeleteProduct = checkPermission(perArr, "deleteProduct");
  const hasEditProduct = checkPermission(perArr, "updateProduct");
  console.log(hasAddProduct, hasDeleteProduct, hasEditProduct);

  // const handleClick = (itemID) => {
  //   navigate(`/singleProduct/${itemID}`);
  // };

  useEffect(() => {
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
      <div className="pro">
        <PageNav hasAddProduct={hasAddProduct} />
        <div className="main-con">
          {product.map((item) => {
            return (
              <div className="view-products">
                <ProductSection
                  getProduct={getProduct}
                  details={item}
                  hasDeleteProduct={hasDeleteProduct}
                  hasEditProduct={hasEditProduct}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
