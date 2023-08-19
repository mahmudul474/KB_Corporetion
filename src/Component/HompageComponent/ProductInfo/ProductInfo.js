import React from "react";
import infoImg1 from "./ProductInfo1.jpg";
import infoImg2 from "./productinfo2.jpg";
import plusImage from "./plus_ico.png";

export default function ProductInfo() {
  return (
    <div className="lg:h-[500px] lg:my-16 my-5">
      <div className="lg:relative flex flex-col lg:flex-row px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="text-left  ">
          <h1 className="text-3xl text-black  mb-5 capitalize   font-semibold">
            Product information
          </h1>
          <p className="text-black  mb-5">
            Kb Steel's products are of the highest quality and fast service.
            <br></br> We guarantee the highest customer satisfaction
          </p>
          <button className="btn mb-5 px-5 bg-transparent border  border-black ">
            More
          </button>
        </div>

        <div className="lg:absolute   flex justify-center items-center lg:flex-row  flex-col  right-0">
          <div className="relative mr-6 cursor-pointer">
            <img className="w-full h-full" src={infoImg1} />
            <div className="absolute flex p-3 w-full justify-between  items-center top-4">
              <h1 className="text-2xl text-white font-semibold  ">
                Cold Rolled Products
              </h1>
              <img src={plusImage} />
            </div>
          </div>
          <div className="relative top-16 mr-6 cursor-pointer">
            <img className="w-full h-full" src={infoImg2} />
            <div className="absolute flex p-3 w-full justify-between  items-center top-4">
              <h1 className="text-2xl text-white font-semibold  ">
                hot rolled product
              </h1>
              <img src={plusImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
