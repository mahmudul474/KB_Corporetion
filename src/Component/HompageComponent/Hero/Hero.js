import React from "react";
import homeBannerBg from "../../../assets/banner-bg-1.png";
import homeBannerImg from "../../../assets/banner-1.png";
import Slider from 'react-slick';
import Slide1 from "./HeroSlider/Slide1/Slide1";
import Slide2 from "./HeroSlider/Slide2/Slide2";
import Slide3 from "./HeroSlider/Slide3/Slide3";

const Hero=()=> {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000 // Adjust the speed as needed
  };

  return (
    <header
      className="bg-no-repeat relative bg-center  bg-cover	"
      style={{ backgroundImage: `url(${homeBannerBg})` }}
    >
      <Slider {...settings}>
        <div>
          <Slide1></Slide1>
        </div>
        <div>
          <Slide2></Slide2>
        </div>
        <div>
          <Slide3></Slide3>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </header>
  );
}

export default Hero;




