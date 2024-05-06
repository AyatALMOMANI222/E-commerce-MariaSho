import React,{useEffect, useState} from 'react'
import "./style.scss"
import Input from '../Core Component/Input'
import SVG from "react-inlinesvg"
import { heartIcon,cartIcon } from '../../icons'
const PageNav = () => {
    const [search ,setSearch]=useState("")

  return (
    <div className='nav-page-container'>
      <div className='input'>
        <Input classname="inp" onChange={(e)=>{
       setSearch(e.target.value)     
        }} placeholder={"Enter Your Search Item"}/>
      </div>
      <div>
<SVG src={heartIcon} width={20} height={24}></SVG>
<SVG src={cartIcon} width={20} height={24}></SVG>
      </div>
    </div>
  )
}

export default PageNav
