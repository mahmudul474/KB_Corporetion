import React from "react";
import serviceImg from "./image/service1.jpg";
export default function Services() {
  return (
    <div>
      <div className="px-4 py-5 my-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="flex justify-start my-4 items-start ">
          <h1 className="text-3xl  text-black  font-semibold capitalize">
            services
          </h1>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
            <img
              className="object-cover w-full h-48"
              src={serviceImg}
              alt="img"
            />

            <div className="absolute  bottom-0 left-0 px-6 py-4">
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                This is the title
              </h4>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
            <img
              className="object-cover w-full h-48"
              src={serviceImg}
              alt="img"
            />

            <div className="absolute bg-gray-400  bg-opacity-50 w-full bottom-0 left-0 px-6 py-4">
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                This is the title
              </h4>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
            <img
              className="object-cover w-full h-48"
              src={serviceImg}
              alt="img"
            />

            <div className="absolute  bottom-0 left-0 px-6 py-4">
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                This is the title
              </h4>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
            <img
              className="object-cover w-full h-48"
              src={serviceImg}
              alt="img"
            />

            <div className="absolute  bottom-0 left-0 px-6 py-4">
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                This is the title
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
