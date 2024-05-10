import React from "react";
import OptionsTabs from "../optionsTab";
import MainSlider from "../Core Component/MainSlider";
import SecondPage from "../secondPage";
import ThirdPage from "../thirdPage";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import "./style.scss";
const Home = () => {
  const navigate = useNavigate();
  const images = [
    "https://images.pexels.com/photos/10827097/pexels-photo-10827097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6353843/pexels-photo-6353843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1827130/pexels-photo-1827130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <div className="outer-container">
      <div className="img-title-div">
        <img
          className="img"
          src="https://png.pngtree.com/png-vector/20190221/ourmid/pngtree-shopping-bag-graphic-design-template-png-image_690677.jpg"
        />

        <div className="title">MARIASHOP</div>
      </div>

      <span>
        <div className="slider-container">
          <MainSlider images={images} interval={3000} />
        </div>
        <div>
          <SecondPage />
        </div>
        <div>
          <ThirdPage />
        </div>
        <div>
          <Footer />
        </div>
      </span>
    </div>
  );
};

export default Home;
