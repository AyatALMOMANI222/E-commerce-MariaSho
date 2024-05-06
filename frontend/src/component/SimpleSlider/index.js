import React, { useState, useEffect } from "react";
import "./style.scss";
import { ListItem } from "@material-ui/core";
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

const slides = [...a, ...a,...a,...a, ...a];
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === slides.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="slider-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slides-container">
        <div
          className="slides"
          style={{
            transform: `translateX(-${currentIndex * 5}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img src={slide.img} />
              <div className="title">{slide.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
