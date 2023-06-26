import React from "react";
import banner from "./hero.jpeg";

const Hero = () => {
  return (
    <div className="	 h-[350px]  flex justify-start items-center ">
      <div className="bg-[#719f18]  h-full hidden lg:flex items-center justify-center lg:w-[250px]">
        <ul className="w-full rounded-md ">
          <li className="hover:bg-[#73471b] cursor-pointer  transition duration-300 ease-in-out w-full my-[2px] p-2 text-xl capitalize font-semibold text-white">
            Category
          </li>
          <li className="hover:bg-[#73471b] cursor-pointer  transition duration-300 ease-in-out w-full my-[2px] p-2 text-xl capitalize font-semibold text-white">
            24 to sell
          </li>
          <li className="hover:bg-[#73471b] cursor-pointer  transition duration-300 ease-in-out w-full my-[2px] p-2 text-xl capitalize font-semibold text-white">
            mis
          </li>
          <li className="hover:bg-[#73471b] cursor-pointer  transition duration-300 ease-in-out w-full my-[2px] p-2 text-xl capitalize font-semibold text-white">
            333
          </li>
          <li className="hover:bg-[#73471b] cursor-pointer  transition duration-300 ease-in-out w-full my-[2px] p-2 text-xl capitalize font-semibold text-white">
            mis
          </li>
          <li className="hover:bg-[#73471b] cursor-pointer  transition duration-300 ease-in-out w-full my-[2px] p-2 text-xl capitalize font-semibold text-white">
            333
          </li>
        </ul>
      </div>
      <div
        className="w-full bg-no-repeat h-full flex items-center justify-start    bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="lg:text-left md:text-left text-center  pl-10">
          <h1 className="text-white  text-[40px] font-bold capitalize ">
            Find Your <br /> Next Deal!
          </h1>
          <p className="text-lg font-semibold capitalize text-green-50 mb-2">
            Online Auction is where everyone goes to shop
          </p>
          <button className="btn border-none hover:bg-[#995f25]  bg-[#507408] text-white rounded-md">
            Get Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
