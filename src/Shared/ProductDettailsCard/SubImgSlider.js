import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const SubImgSlider = ({ images, handleSubimgShow }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevImages = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextImages = () => {
    if (startIndex < images.length - 4) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="flex overflow-hidden">
        {images.slice(startIndex, startIndex + 4).map((imageUrl, index) => (
          <div key={index} className="mx-2">
            <img
              onClick={() => handleSubimgShow(imageUrl)}
              className="object-cover cursor-pointer  w-full h-32"
              src={imageUrl}
              alt={`Image ${startIndex + index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center my-2 items-center">
        <span
          onClick={handlePrevImages}
          className=" font-bold text-2xl cursor-pointer mx-2 text-green-500"
        >
          <BsChevronLeft></BsChevronLeft>
        </span>
        <p
          onClick={handleNextImages}
          className=" font-bold text-2xl mx-2 cursor-pointer text-green-500"
        >
          <BsChevronRight></BsChevronRight>
        </p>
      </div>
    </div>
  );
};

export default SubImgSlider;
