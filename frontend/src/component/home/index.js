import React, { useState ,useEffect } from "react";
import OptionsTabs from "../optionsTab";
import MainSlider from "../Core Component/MainSlider";
import SecondPage from "../secondPage";
import "./style.scss";
import ThirdPage from "../thirdPage";
import Footer from "../Footer";
import { useNavigate }from "react-router-dom";
import axios from "axios";
const Home = () => {
    const [type,setType] = useState("")
    const[product,setProduct]=useState([])

    const navigate=useNavigate()
    const images = [
        'https://images.pexels.com/photos/10827097/pexels-photo-10827097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/6353843/pexels-photo-6353843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
   'https://images.pexels.com/photos/1827130/pexels-photo-1827130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      ];
      const handleLoginClick =()=>{
        navigate("/login")
      }
      const handleAboutClick=()=>{
        navigate("/about")
      }
      const handleClick = (type) => {
        setType(type); 
        navigate(`/page/${type}`);
      };
      
  return (
    <div className="outer-container">
      <div className="header-container">
        <div className="name">
          <OptionsTabs title="MARIASHOP" />
        </div>
        <OptionsTabs title="Home" />
        <OptionsTabs
  title="Collection"
  children={[
    {
      label: "men",
      onClick: () => handleClick("men"), 
    },
    {
      label: "kids",
      onClick: () => handleClick("kids"), 
    },
    {
      label: "women",
      onClick: () => handleClick("women"), 
    },
  ]}
/>

        <div onClick={handleAboutClick}>        <OptionsTabs  title="About Us"/>
</div>
        <span onClick={handleLoginClick} className="login" >Login</span>
      </div>


      <div className="img-title-div">
            <img
              className="img"
              src="https://png.pngtree.com/png-vector/20190221/ourmid/pngtree-shopping-bag-graphic-design-template-png-image_690677.jpg"
            />

            <div className="title">MARIASHOP</div>
          </div>



  <span>
    <div className="slider-container">
      <MainSlider images={images} interval={3000}/>
    </div>
    <div>
      <SecondPage/>
    </div>
    <div>
      <ThirdPage/>
    </div>
    <div>
      <Footer/>
    </div>
  </span>



    </div>
  );
};

export default Home;
