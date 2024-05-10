import React from 'react'
import "./style.scss"
const SizeSection = ({availableSize , selectedSize , setSelectedSize}) => {

  return (
    <div className='size-container'>
     {availableSize?.map((item)=>{
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

export default SizeSection
