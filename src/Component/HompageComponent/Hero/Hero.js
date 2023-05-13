import React from "react";
import homeBannerBg from "../../../assets/banner-bg-1.png";
import homeBannerImg from "../../../assets/banner-1.png";

export default function Hero() {
  return (
    <header
      className="bg-no-repeat relative bg-center  bg-cover	"
      style={{ backgroundImage: `url(${homeBannerBg})` }}
    >
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg text-left">
              <h4 className="  font-semibold text-green-500 text-2xl lg:text-3xl">
                Next Generation Auction
              </h4>
              <h1 className="lg:text-[80px] text-[40px] text-white font-bold leading-[40px] lg:leading-[80px]">Find Your <br/> Next Deal!</h1>

              <p className="mt-3 text-xl text-gray-100  ">
              Online Auction is where everyone goes to shop, sell,and give, while discovering variety
                
              </p>

              <div className="flex  ">
                
            <button className="btn hover:bg-green-600 bg-green-600 text-2xl font-bold rounded-xl text-white caption-bottom  p-4 my-5">GET START</button>
                 
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              className="w-full h-full max-w-md"
              src={homeBannerImg}
              alt="img"
            />
          </div>
        </div>
      </div>
    
    
    </header>
  );
}
