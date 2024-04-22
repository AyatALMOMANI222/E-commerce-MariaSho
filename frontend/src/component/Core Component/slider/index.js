import React, { useState, useEffect } from 'react';
import "./style.scss"

const Slider = ({ imageUrls }) => {
    const [currentImage, setCurrentImage] = useState(0); // حالة لتتبع الصورة الحالية
console.log(imageUrls);
    useEffect(() => {
        // تحديث الصورة الحالية عندما يتغير `imageUrls`
        setCurrentImage(0); // قم بتعيين الصورة الحالية إلى الصورة الأولى
    }, [imageUrls]); // قم بتنفيذ التأثير في كل مرة يتغير فيها `imageUrls`

    const nextSlide = () => {
        setCurrentImage((currentImage + 1) % imageUrls.length);
    };

    const prevSlide = () => {
        setCurrentImage((currentImage - 1 + imageUrls.length) % imageUrls.length);
    };

    return (
        <div className="slider">
            <button className="prev" onClick={prevSlide}>&#10094;</button>
            <img src={imageUrls[currentImage]} alt="Slide" />
            <button className="next" onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

export default Slider;
