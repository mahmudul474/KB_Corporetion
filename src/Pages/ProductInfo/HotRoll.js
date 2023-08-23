import React from "react";
import bg from "./hot-rolled.jpg";
import img1  from "./cold1.jpg"
import img2 from "./cold_2.jpg"
import img3 from "./cold3.jpg"

export default function HotRoll() {
  return (
    <div className="text-black ">
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="h-[200px] bg-no-repeat bg-center bg-cover bg-opacity-50 flex flex-col justify-center items-start px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
      >
        <div className="flex justify-center  items-center">
          <h1 className="text-4xl capitalize text-black   text-center  font-bold">
            PRODUCT
          </h1>
        </div>
      </div>
<div className="px-4 py-16 mx-auto sm:max-w-xl  md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="felx text-left justify-start items-start  my-3">
        <h1 className="capitalize  text-left text-3xl font-bold  text-black ">hot rolled product</h1>
        <p className="text-lg leading-loose text-black " >Introduction of item</p>
        <h4>
          Hot-rolled products are produced by a hot strip mill. It refers to
          hot-rolled steel strip in a coil state and hot-rolled steel sheet
          after cutting it
        </h4>
      </div>

      <div>
        <div>
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern
                        id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                      >
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                      width="52"
                      height="24"
                    />
                  </svg>
                  <span className="relative">The</span>
                </span>{" "}
                Cold rolled steel (CR)
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
              For cold-rolled steel sheets, scale generated on the surface of hot-rolled coils is removed with hydrochloric acid or sulfuric acid in the pickling process, and after rolling thinly with rolling rolls,
It is a product that has the thickness and mechanical properties required by customers by undergoing annealing heat treatment.
              </p>
            </div>
            <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
              <div className="max-w-md  sm:mx-auto sm:text-center ">
                <div className="flex  justify-center items-center bg-orange-500 text-white   w-16 h-16 mb-4 rounded-full  sm:mx-auto sm:w-24 sm:h-24">
                  <span>
                    <svg
                      className="w-12 h-12 text-white  m:w-16 sm:h-16"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex flex-col lg:items-center items-start">
                  <h6 className="mb-3 text-xl font-bold leading-5 text-orange-500">
                    main purpose
                  </h6>
                  <p className="mb-3 text-left lg:text-center  text-sm text-gray-900">
                  used for general purpose
As a steel material, home appliances, drums, furniture manufacturing, etc.
                  </p>
                </div>
              </div>
              <div className="max-w-md  sm:mx-auto sm:text-center ">
                <div className="flex  justify-center items-center bg-orange-500 text-white   w-16 h-16 mb-4 rounded-full  sm:mx-auto sm:w-24 sm:h-24">
                  <span>
                    <svg
                      className="w-12 h-12 text-white  m:w-16 sm:h-16"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex flex-col lg:items-center items-start">
                  <h6 className="mb-3 text-xl font-bold leading-5 text-orange-500">
                    characteristic
                  </h6>
                  <p className="mb-3 text-left lg:text-center  text-sm text-gray-900">
                  Cold-rolled steel has a beautiful surface and good workability.
From household items such as refrigerators and washing machines,
From industrial equipment to various construction materials and automobiles
It is used for various purposes and according to the advancement of industrial structure
It is in the limelight as an essential material in modern society
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid px-4   py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-10 ">
        <img
          class="h-auto max-w-lg rounded-lg"
          src={img1}
          alt="img"
        />

        <img
          class="h-auto max-w-lg  lg:-mt-20 rounded-lg"
          src={img2}
          alt="img"
        />

        <img
          class="h-auto max-w-lg rounded-lg"
          src={img3}
          alt="img"
        />
      </div>
      </div>
    </div>
  );
}
