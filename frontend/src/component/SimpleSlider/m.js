import React,{useEffect,useState} from 'react'

const Slides = () => {
const [currentIndex,setCurrentIndex]=useState(0)
    const [render , setRender]=useState(true)


const a = [
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DdGayLk0YMtu1A_EEzHX0QfV1OaXRhNVPQ&s",
          title: "boots",
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_NGpJbgf0fwI_22kWX5RzmmLtl75-zjAYBA&s",
          title: "heals",
        },
        {
          img: "https://www.raneen.com/media/images/cache/catalog/category/400x400/Cleaning_Tools_Supplies-.png",
          title: "home",
        },
      //   {
      //     img: "https://elisabethmckight.com/wp-content/uploads/2021/09/Shein-Kids-Reviews-0328-684x1024.jpg",
      //     title: "kids",
      //   },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_4psqp6mk9mjqsDeCgwPGS8T4VWHTrYoAQ&s",
          title: "kitchen",
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcmV40ZDwBvrlBy_Kk74G8GxLOEvv41xPcpA&s",
          title: "men",
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2V-x31APEtjeDRZIN4VKqM48HCh9Eed7yQ&s",
          title: "sports",
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF9V-ojF1GxDUovmpW6wDBKbJII-GqjCZTyQ&s",
          title: "women",
        },
      ];

useEffect(()=>{
const interval =setInterval(()=>{
setCurrentIndex((prevIndex)=>{
    if(prevIndex === Slides.length - 1){
    setRender(false)
    setTimeout(()=>{
        setCurrentIndex(0)
setRender(true)
    },[0]) 
    return 0;
    }
return prevIndex + 1
})
},1000)
},[])

  return (
    <div>
      
    </div>
  )
}

export default Slides
