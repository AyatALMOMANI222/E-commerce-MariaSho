import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { editIcon, closeIcon } from '../../icons';
import ProductCard from '../Core Component/Card';
import EditProduct from "../EditProduct";

import './style.scss'
import OneProduct from '../oneProduct';
import ProductSection from '../ProductSection/ProductSection';

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
    <div>
        <div className='all-product'>
  {product?.map((item) => {
          return (
            <div onClick={()=>handleButtonClick(item.type,item.id)} key={item.id} className='product' >
              <ProductSection details={item} />
            </div>
          );
        })}
    </div>
    </div>
  )
}

export default Categorey
