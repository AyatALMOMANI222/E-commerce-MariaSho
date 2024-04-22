import React, { useState ,useEffect} from "react";
import img1 from "../listimage/t1.jpg";
import img2 from "../listimage/t2.jpg";
import img3 from "../listimage/t3.jpg";
import img4 from "../listimage/t4 (2).jpg";
import img5 from "../listimage/t5.jpg";
import ColorsSection from "../ColorsSection";
import Size from "../SizeSection";
import Slider from "../Core Component/slider";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.scss";
const SingleProduct = () => {
  const {itemID} =useParams()
  const details = [
    `Model is 5'9", Waist 26" Chest 32", wearing size S`,
    `Model is 5'9", Waist 26" Chest 32", wearing size S`,
    `Model is 5'9", Waist 26" Chest 32", wearing size S`,
  ];
  const [selectedColor, setSelectedColor] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);

  const [selectedSize, setSelectedSize] = useState("");
  const [product,setProduct]=useState("")
  const [images,setImages]=useState([])
  // const [imageArr,setImageArr]=useState([])
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/one/${itemID}`)
      .then((response) => {
        console.log(response?.data);
        const product =response?.data.product

         setProduct(response?.data.product);
         console.log(product);
         const availablesize = product.sizes.split(",")
         console.log(availablesize);
         setAvailableSizes(availablesize)
     const availablecolor =product.colors.split(",")
    setAvailableColors(availablecolor)

      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/image/${itemID}`)
      .then((response) => {
        console.log(response?.data.images);
    setImages(response?.data.images)
    console.log(images);
    const imagesData = response?.data.images; // البيانات القادمة من الطلب

    const imageUrls = imagesData.map((image) => image.image_url); // استخراج عناوين URL للصورة فقط
console.log(imageUrls);
setImageUrls(imageUrls);

      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);

//    const img = images.map((item)=>{
//         return(
//             <div>
//                <div> {item.image_url}</div>
//                {setImageArr((prev)=>[...prev,item.image_url]
//                )}
//             </div>
//         )
//     })
// console.log(imageArr);
    
  return (
    <div className="single-product-container">
      <div className="first-section">
        <div className="small-img">
          <img src={img2} className="img" />
          <img src={img3} className="img" />
          <img src={img4} className="img" />
        </div>
        <div className="large-img">
          <Slider  imageUrls={imageUrls} />
        </div>
      </div>

      <div className="second-section">
        <div className="title">{product.name}</div>
        <div className="price">{product.price}$ USD</div>
        <div className="colors-chips-container">
          <ColorsSection
            availableColors={availableColors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        <div className="sizes-chips-containetr">
          <Size
            selectedSize={selectedSize}
            availablesize={availableSizes}
            setSelectedSize={setSelectedSize}
          />
        </div>

        <button className="btn">ADD TO CART</button>

        <hr />
        {details.map((item) => {
          return (
            <div className="section-one">
              <span className="dot"></span>
              <div>{item} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleProduct;
