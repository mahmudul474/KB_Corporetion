import React from "react";
import bg from "../../../assets/call-bg.png";

export default function Subscriptions() {
  return (
    <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div
        className="bg-no-repeat    rounded-lg bg-center  bg-cover	"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="p-16 flex flex-col items-center lg:flex-row justify-between">
          <div className="text-left">
            <h1 className="text-4xl mb-2 font-semibold text-white">
              Register For Free & Start <br /> Bidding Now!
            </h1>
            <p className="text-lg text-white">
              From cars to diamonds to Still, we have it all
            </p>
          </div>
          <div>
            <button className="btn  bg-white text-black hover:text-white hover:bg-green-600 p-4 rounded-lg text-xl font-bold transition">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
