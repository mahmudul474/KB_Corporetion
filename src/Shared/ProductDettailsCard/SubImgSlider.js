import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SubImgSlider = ({ images }) => {
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
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:grid-cols-2">
      <Slider {...sliderSettings}>
        {images.map((imageUrl, index) => (
          <div className="" key={index}>
            <img
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
