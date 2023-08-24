import React from "react";
import infoImg1 from "./ProductInfo1.jpg";
import infoImg2 from "./productinfo2.jpg";
import plusImage from "./plus_ico.png";
import { Link } from "react-router-dom";

export default function ProductInfo() {
  return (
    <div className="lg:h-[500px] lg:my-16 my-5">
      <div className="lg:relative flex flex-col lg:flex-row px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="text-left  ">
          <h1 className="text-3xl text-black  mb-5 capitalize   font-semibold">
            Explore Our Prime Steel
          </h1>
          <p className="text-black  mb-5 hidden lg:block lg:w-[30%]">
            Dive into the world of steel excellence with our three standout
            variants. Discover the precision and refined aesthetics of Cold
            Rolled Steel, unlock a realm of strength and adaptability with Hot
            Rolled Steel, and ensure enduring resilience against corrosion with
            our Galvanized Steel. Across diverse applications, these variants
            redefine the possibilities of steel performance.
          </p>
          <Link to="/cold-rolled">
            <button className=" mb-5 px-5 bg-transparent border  border-black ">
              More
            </button>
          </Link>
        </div>

        <div className="lg:absolute   flex justify-center items-center lg:flex-row  flex-col  right-0">
          <Link to="/cold-rolled">
            <div className="relative mr-6 cursor-pointer">
              <img className="w-full h-full" src={infoImg1} />
              <div className="absolute flex p-3 w-full justify-between  items-center top-4">
                <h1 className="text-2xl text-white font-semibold  ">
                  Cold Rolled Products
                </h1>
                <img src={plusImage} />
              </div>
            </div>
          </Link>
          <Link to="/hot-rolled">
            <div className="relative top-16 mr-6 cursor-pointer">
              <img className="w-full h-full" src={infoImg2} />
              <div className="absolute flex p-3 w-full justify-between  items-center top-4">
                <h1 className="text-2xl text-white font-semibold  ">
                  hot rolled product
                </h1>
                <img src={plusImage} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
