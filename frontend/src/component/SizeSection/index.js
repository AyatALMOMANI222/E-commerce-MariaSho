import React from 'react'
import "./style.scss"
const Size = ({availablesize , selectedSize , setSelectedSize}) => {

  return (
    <div className='size-container'>
     {availablesize.map((item)=>{
        return(
            <div >
            <div className={`size ${selectedSize == item? "selected" : ""} `} onClick={()=>{
                setSelectedSize(item)
            }}>{item}</div>
            </div>
        )
     })}
    </div>
  )
}

export default Size
