import React, { useEffect, useState } from "react";
import axios from "axios";
import Categorey2 from "../Category2";
import "./style.scss";
import Pagination from "../Pagination";
import ProductSection from "../ProductSection/ProductSection";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [price, setPrice] = useState({ min: 0, max: 50 });
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  const getProducts = () => {
    axios
      .get("http://localhost:5000/filter", {
        page: pageNum,
        limit: 10,
        name: name,
        type: category,
        size: size,
        color: color,
        minPrice: price.min,
        maxPrice: price.max,
      })
      .then((response) => {
        console.log(response?.data);
        setProducts(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Pagination
        totalElements={100}
        currentPage={pageNum}
        setCurrentPage={setPageNum}
      />
      <Categorey2 categorey={category} setCategorey={setCategory} />
      {products.map((item, index) => {
        console.log(index);
        return (
          <div className="products-container">
            {item.name}
            <ProductSection
              getProduct={getProducts}
              details={item}
              hasDeleteProduct={true}
              hasEditProduct={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
