import React from "react";

const SubImgSlider = ({ images, handleSubimgShow }) => {
  console.log(images);
  return (
    <div className="grid grid-cols-5 lg:grid-cols-2 gap-2">
      {images?.map(imageUrl => (
        <img
          onClick={() => handleSubimgShow(imageUrl)}
          className="lg:h-52 h-full  w-full  object-cover border"
          src={imageUrl}
        />
      ))}
    </div>
  );
};

export default SubImgSlider;
