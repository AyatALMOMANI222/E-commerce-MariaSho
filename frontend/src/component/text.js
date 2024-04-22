import axios from 'axios'
import React, { useEffect , useState } from 'react'

const Text = () => {
    const [page,setPage]=useState([])
useEffect(()=>{
    axios.get(`http://localhost:5000/product/page`)
    .then((response) => {
        console.log(response?.data.products);
        setPage(response?.data.products)
      })
      .catch((error) => {
        console.error("Error Login:", error);
      });
},[])
  
  return (
    <div>
      {page?.map((item)=>{
        return(
            <div>
                {item.name}
            </div>
        )
      })}
    </div>
  )
}

export default Text
