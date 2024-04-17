import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { editIcon, closeIcon } from '../../icons';
import ProductCard from '../Core Component/Card';
import EditProduct from "../EditProduct";

import './style.scss'
import OneProduct from '../oneProduct';

const Categorey = () => {
const[product,setProduct]=useState([])
const [isOpen, setIsOpen] = useState(false);
const [editProductId, setEditProductId] = useState(null); // تحديد معرف المنتج المحدد للتحرير
const token = localStorage.getItem("token");

const { type } = useParams();
const navigate=useNavigate()
const handleEditClick = (productId) => {
    setEditProductId(productId);
    setIsOpen(!isOpen); 
  };
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
useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${type}`)
      .then((response) => {
        console.log(response?.data);
        setProduct(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);
const handleButtonClick=(type,id)=>{
  navigate(`/categorey/${type}/${id}`)
}

  return (
    <div className='Product-container'>
        <div className='one-product-container'>
  {product?.map((item) => {
          return (
            <div key={item.id} className="product">
              <div className="header">
                {/* <div> {item.name}</div> */}
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
              <ProductCard
  name={item.name}
  description={item.description}
  price={item.price}
  image={item.image}
  type={item.type}
  onClick={() => handleButtonClick(item.type, item.id)} // تعديل هنا

  buttonName="Add to Cart"
/>

             
              {editProductId === item.id && isOpen && (
                <EditProduct
                  editProductId={editProductId}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              )}{" "}
                    

            </div>
          );
        })}
    </div>
    </div>
  )
}

export default Categorey
