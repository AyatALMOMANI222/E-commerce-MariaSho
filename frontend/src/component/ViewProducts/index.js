import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import SingleProduct from "../OneProductComponent";
import ProductSection from "../ProductSection/ProductSection";
import { useNavigate}  from "react-router-dom";
const ViewProducts = () => {

  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [selectProducts, setSelectProducts] = useState({});

  const [filters, setFilters] = useState({
    name: "",
    description: "",
    size: "",
    color: "",
    material: "",
    brand: "",
  });
  const navigate=useNavigate()

  const getProduct = () => {
   
    axios
      .get(`http://localhost:5000/product/page`, {
        params: {
          page: pageNum,
          ...filters,
        },
      })
      .then((response) => {
        console.log(response.data
        );
        setProducts((prev) => {
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
  navigate(`/singleProduct/${itemID}`)
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
    <div  className="main-con">
      {products.map((item) => {
        return <div className="view-products" onClick={()=>handleClick(item.id)}>
            <ProductSection details={item}/>
            
        </div>;
      })}
      
    </div>
  );
};

export default ViewProducts;
