import React, { useState, useEffect } from "react";

const ImgSlide = ({ images, handleSubimgShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-md"
        onClick={prevSlide}
      >
        Previous
      </button>
      <div className="flex">
        {images.map((image, index) => (
          <img
            onClick={() => handleSubimgShow(image)}
            key={index}
            src={image}
            alt={image}
            className={`w-40 h-40 m-2 transition-all duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-50"
            }`}
          />
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-md"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default ImgSlide;
