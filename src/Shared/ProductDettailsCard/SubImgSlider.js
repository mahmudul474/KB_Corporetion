import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SubImgSlider = ({ images, handleSubimgShow }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(images.length, 3), // Display 3 slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
  return (
    <div className="">
      <Slider {...sliderSettings}>
        {images.map((imageUrl, index) => (
          <div className=" w-full mx-5  " key={index}>
            <img
              onClick={() => handleSubimgShow(imageUrl)}
              className="h-52 object-fill border"
              src={`${process.env.REACT_APP_API_URL}/uploads/sub-images/${imageUrl}`}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SubImgSlider;
