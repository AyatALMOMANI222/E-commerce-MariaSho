import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import ProductSection from "../ProductSection/ProductSection";
import InputRange from "../inputSlider";
import Accordion from "../Core Component/Accordion";
import Select from "../Core Component/Select";
import ColorsSection from "../ColorsSection";
import SizeSection from "../SizeSection";
import { useParams } from "react-router-dom";
import "./style.scss";
const ProductsPage = () => {
  const { currentType } = useParams();
  const [products, setProducts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [price, setPrice] = useState("54");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState(currentType);
  const [totalElement, setTotalElement] = useState("");

  const getProducts = () => {
    axios
      .get("https://e-commerce-maria-sho.vercel.app/filter", {
        params: {
          page: pageNum,
          name: name,
          type: type,
          size: size,
          color: color,
          minPrice: 0,
          maxPrice: price,
        },
      })
      .then((response) => {
        console.log(response?.data);
        setProducts(response?.data.products);
        setTotalElement(response?.data.totalElement);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };

  useEffect(() => {
    getProducts();
  }, [pageNum]);

  useEffect(() => {
    setPageNum(1);
    setTimeout(() => {
      getProducts();
    }, [0]);
  }, [price, color, size, name, type, currentType]);

  return (
    <div>
      <Pagination
        totalElements={totalElement}
        currentPage={pageNum}
        setCurrentPage={setPageNum}
      />
      <div className="products-list-page">
        <div className="filter-container">
          <Accordion
            title={"price"}
            children={
              <div className="price-rage-container">
                <InputRange
                  value={price}
                  setValue={setPrice}
                  minValue="0"
                  maxValue="115"
                />
                <div className="price-value"> {price} JOD</div>
              </div>
            }
          />

          <Accordion
            title={"Colors"}
            children={
              <div className="price-rage-container">
                <ColorsSection
                  availableColors={["red", "blue", "green"]}
                  selectedColor={color}
                  setSelectedColor={setColor}
                />
              </div>
            }
          />
          <Accordion
            title={"Sizes"}
            children={
              <div className="price-rage-container">
                <SizeSection
                  availableSize={["XS", "S", "M", "L", "XL", "XXL"]}
                  selectedSize={size}
                  setSelectedSize={setSize}
                />
              </div>
            }
          />
          <div className="type-container">
            <Select
              value={type}
              setValue={setType}
              placeholder="Type"
              label={"Type"}
              options={[
                { label: "All", value: "" },
                { label: "Woman", value: "woman" },
                { label: "Men", value: "men" },
                { label: "Kids", value: "kids" },
                { label: "women", value: "woman" },
              ]}
            />
          </div>

          <button
            className="reset-button"
            onClick={() => {
              setPageNum(1);
              setPrice("");
              setColor("");
              setSize("");
              setName("");
              setType("");
            }}
          >
            Reset
          </button>
        </div>

        <div className="products-list-container">
          {products?.map((item, index) => {
            return (
              <div key={index} className="products-container">
                <ProductSection
                  getProduct={getProducts}
                  details={item}
                  hasDeleteProduct={true}
                  products={products}
                  setProducts={setProducts}
                  hasEditProduct={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
