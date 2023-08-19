import React from "react";
import bg from "./corporate.jpg";
export default function CorporateValue() {
  return (
    <div
      className="bg-no-repeat  bg-cover min-h-screen"
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      <div className="py-[90px] px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className=" flex justify-center items-center  flex-col">
          <h1 className="lg:text-[90px] text-[40px]  text-white font-bold lg:text-black capitalize">
            Corporate Value
          </h1>
          <p className="text-white text-lg   capitalize lg:text-black ">
            POSCO STILLION pursues the corporate value of coexistence .
          </p>
        </div>

        <div className="grid gap-5 my-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"></div>

        <div>
          <a
            href="#"
            class="block max-w-sm p-6 bg-[#4588b4] bg-opacity-50  border  rounded-lg shadow  "
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
