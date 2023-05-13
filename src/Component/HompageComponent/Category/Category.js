import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryArrows from "./CategoryArrows";
import img1 from "../../../assets/CategoryAssets/01.png";
import img2 from "../../../assets/CategoryAssets/02.png";
import img3 from "../../../assets/CategoryAssets/03.png";
import img4 from "../../../assets/CategoryAssets/04.png";
import img5 from "../../../assets/CategoryAssets/05.png";
import img6 from "../../../assets/CategoryAssets/06.png";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Category = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const category = [
    {
      _id: 1,
      title: "VEHICLES",
      img: img1,
    },
    {
      _id: 2,
      title: "JEWELRY",
      img: img2,
    },
    {
      id: 3,
      title: "WATCHES",

      img: img3,
    },
    {
      id: 4,
      title: "ELECTRONICS",

      img: img4,
    },
    {
      id: 5,
      title: "SPORTS",

      img: img5,
    },
    {
      id: 6,
      title: "REAL ESTATE",

      img: img6,
    },
  ];

  const responsiveSettings = [
    {
      breakpoint: "1023px", // screen size for small devices
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: "1024px", // screen size for larger devices
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: handleSlideChange,
    prevArrow: <CategoryArrows arrowType="prev" />,
    nextArrow: <CategoryArrows arrowType="next" />,
    responsive: responsiveSettings,
  };
  return (
    <div className="px-10 cursor-pointer text-left ">
      <div className="flex justify-between text-left my-4 flex-col lg:flex-row items-center">
        <div>
          <h1 className="text-2xl capitalize font-semibold text-green-600">
            Browse the highlights
          </h1>
        </div>

        <div className="flex items-center my-3 lg:my-0 ">
          <button
            className="bg-green-600  rounded-md p-2 mr-2 w-14 flex justify-center items-center text-white font-bold"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <span>
              {" "}
              <BsArrowLeft></BsArrowLeft>{" "}
            </span>
          </button>
          <button className="bg-green-600  rounded-md p-2 mr-2 w-14 flex justify-center items-center text-white font-bold"
            disabled={currentSlide === category.length - settings.slidesToShow}
            onClick={nextSlide}
          >
            <span>
              <BsArrowRight></BsArrowRight>
            </span>
          </button>
        </div>
      </div>
      <Slider {...settings} ref={sliderRef}>
        {category.map((sCategory) => (
          <div className="w-full  max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex flex-col p-5  items-center">
              <img
                className="w-24 h-24   object-contain"
                src={sCategory?.img}
                alt="categoryImg"
              />
              <h5 className=" text-xl font-medium text-gray-900 dark:text-white">
                {sCategory?.title}
              </h5>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Category;
