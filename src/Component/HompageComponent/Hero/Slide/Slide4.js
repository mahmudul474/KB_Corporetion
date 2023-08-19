import React from "react";
import bgImg from "../Image/herobg.jpg";

export default function Slide4() {
  return (
    <section
      style={{
        backgroundImage: `url(${bgImg})`
      }}
      className={`relative   bg-cover bg-center bg-no-repeat`}
    >
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24  max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[710px] lg:items-center lg:px-8">
        <div className="max-w-xl text-left ltr:sm:text-left ">
          <h4 className="text-lg font-semibold text-black">
            Next Generation Auction
          </h4>
          <h1 className="text-3xl font-extrabold text-black sm:text-5xl">
            Find Your Next Deal!
          </h1>

          <p className="mt-4 max-w-lg text-black sm:text-xl/relaxed">
            Online Auction is where everyone goes to shop, sell,and give, while
            discovering variety and affordability.!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="#"
              className="block w-full rounded  border  btn bg-transparent  px-12 py-3 text-sm font-medium text-black  hover:bg-transparent border-black focus:outline-none focus:ring  sm:w-auto"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
