import React from 'react'
import how1 from "../../../assets/how1.png"
import how2 from "../../../assets/how2.png"
import how3 from "../../../assets/how3.png"

export default function HowToWork() {
  return (
    <div className="bg-[#719f18] m-auto rounded-lg mt-20    md:px-8 w-full lg:px-8">
      <div className="p-10 py-16">
        <div className="text-left ">
          <h1 className="text-3xl font-semibold text-white">How It Works</h1>
          <h3 className="text-white text-lg">Easy 3 steps to win</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 m-auto">
          <div className="flex justify-center items-center flex-col">
            <div>
              <img className="w-full h-full" src={how1} alt="" />
            </div>
            <div className="mt-3">
              <h2 className="text-2xl font-semibold capitalize text-white">
                Sign Up
              </h2>
              <h3 className="text-xl text-white">No Credit Card Required</h3>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div>
              <img className="w-full h-full" src={how2} alt="" />
            </div>
            <div className="mt-3">
              <h2 className="text-2xl font-semibold capitalize text-white">
                Bid
              </h2>
              <h3 className="text-xl text-white">
                Bidding is free Only pay if you win
              </h3>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div>
              <img className="w-full h-full" src={how3} alt="" />
            </div>
            <div className="mt-3">
              <h2 className="text-2xl font-semibold capitalize text-white">
                Win
              </h2>
              <h3 className="text-xl text-white">
                Fun - Excitement - Great deals
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
