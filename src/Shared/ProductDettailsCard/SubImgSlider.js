import React from "react";

const SubImgSlider = ({ images, handleSubimgShow }) => {
  return (
    <div className="grid grid-cols-5 lg:grid-cols-2 gap-2">
      {images?.map(imageUrl => (
        <img
          onClick={() => handleSubimgShow(imageUrl)}
          className="lg:h-52 h-full  w-full  object-contain border"
          src={`${process.env.REACT_APP_API_URL}/uploads/sub-images/${imageUrl}`}
        />
      ))}
    </div>
  );
};

export default SubImgSlider;
