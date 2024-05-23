import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./style.scss"
const ThirdPage = () => {
  const navigate =useNavigate()
  const handleClick=()=>{
    navigate(`/page/accessories`)
  }
  return (
   <div className='third-page'>
     <div className='img-page-container'>
      <img className='img'  src='https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
      <button onClick={handleClick} className='btn'>go to Accessories</button>

    </div>
   </div>
  )
}

export default ThirdPage
