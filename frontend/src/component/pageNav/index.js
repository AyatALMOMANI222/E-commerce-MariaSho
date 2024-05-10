import React,{useEffect, useState} from 'react'
import "./style.scss"
import Input from '../Core Component/Input'
import SVG from "react-inlinesvg"
import { heartIcon,cartIcon } from '../../icons'
import { useNavigate } from 'react-router-dom'
const PageNav = ({hasAddProduct}) => {
    const [search ,setSearch]=useState("")
const navigate = useNavigate()
  return (
    <div className='nav-page-container'>
      <div className='input'>
        <Input classname="inp" onChange={(e)=>{
       setSearch(e.target.value)     
        }} placeholder={"Enter Your Search Item"}/>
      </div>
  
      <div className='add-product-icon'>
      <div className='btn' >  {hasAddProduct &&  <button className='button' onClick={()=>{
          navigate("/product")
        }}>Add Product</button>}</div>
<SVG className='icon' src={heartIcon} width={20} height={24}></SVG>
<SVG className='icon' src={cartIcon} width={20} height={24}></SVG>
      
      </div>
    </div>
  )
}

export default PageNav
