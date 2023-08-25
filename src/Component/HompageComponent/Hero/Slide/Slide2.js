import React from "react";
import bgImg from "./assetes/slide2.jpg";
import { Link } from "react-router-dom";

export default function Slide2() {
  return (
    <section
      style={{
        backgroundImage: `url(${bgImg})`
      }}
      className={`relative z-1   bg-cover bg-center bg-no-repeat`}
    >
      <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50"></div>
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24  max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[710px] lg:items-center lg:px-8">
        <div className="max-w-xl text-left ltr:sm:text-left ">
          <h4 className="text-lg font-semibold text-black">
            Forge Connections, Secure Profits
          </h4>
          <h1 className="text-3xl font-extrabold text-black sm:text-5xl">
            Prime Steel Bidding Hub
          </h1>

          <p className="mt-4 max-w-lg text-black sm:text-xl/relaxed">
            Connect with premier suppliers on our dynamic platform. Explore
            diverse steel products, secure profits through strategic bidding.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              to="/ga"
              className="block w-full rounded  border  btn bg-transparent  px-12 py-3 text-sm font-medium text-black  hover:bg-transparent border-black focus:outline-none focus:ring  sm:w-auto"
            >
              Explore-Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
