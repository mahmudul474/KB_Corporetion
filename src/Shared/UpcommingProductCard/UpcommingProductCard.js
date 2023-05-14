import React from "react";
import actionimg1 from "../../assets/auction (1).png";
import price from "../../assets/price (2).png";

export default function UpcommingProductCard() {
  return (
    <div class="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-300">
      <div class="w-full   lg:w-1/4">
        <img
          className="w-full h-full"
          alt="img"
          src="https://pixner.net/sbidu/main/assets/images/auction/upcoming/upcoming-1.png"
        />
      </div>
      <div class="w-full lg:w-1/2 px-4 mt-4 lg:mt-0">
        <div className=" text-left lg:text-center">
          <h2
            className="text-lg my-3  font-bold
          "
          >
            14k Gold Geneve Watch,24.5g
          </h2>
          <div className="flex  justify-start lg:justify-center items-center my-4">
            <p className="border-r-2  mr-3 pr-2 border-emerald-500   ">
              <span className="text lg font-bold">Listing ID:</span> 14033488
            </p>
            <p className="border-r-2  mr-3 pr-2 border-emerald-500   ">
              <span className="text lg font-bold">Item:</span> #14033488
            </p>
          </div>
        </div>
        <hr />

        <div className="flex  justify-start lg:justify-center items-start lg:items-center py-5 ">
          <div className="flex mr-3">
            <img className="w-10 h-10" alt="action" src={actionimg1} />
            <div className="ml-2 text-lg font-semibold">
              <h2 className="text-green-600">Current Bid</h2>
              <h1> 300 $</h1>
            </div>
          </div>
          <span className="w-[2px] h-10 bg-green-600"></span>
          <div className="flex ml-2">
            <img className="w-10 h-10" alt="action" src={price} />
            <div className="ml-2 text-lg font-semibold">
              <h2 className="text-red-600">Buy now</h2>
              <h1>400 $</h1>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="my-3 flex flex-col lg:flex-row  items-start lg:items-center justify-start lg:justify-center text-left">
          <p className="border-r-2  mr-3 pr-2 border-emerald-500  text-green-600  ">
            <span className="text-lg font-bold text-black">Total Bids</span> :
            50 Bids
          </p>
          <p className="border-r-2  mr-3 pr-2 border-emerald-500  text-green-600  ">
            <span className="text-lg font-bold text-black">Last Bids</span> : 7
            minute ago
          </p>
        </div>
      </div>
      <div class="w-full lg:w-1/4 bg-slate-200">
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 py-2 text-green-600">
            Bidding ends in
          </h2>
          <h4 className="text-red-500 text-lg ">0d : 23h : 33m : 7s</h4>
        </div>

        <div className="mb-8" >
          <h3>Bid Increment</h3>
          <h1 className="text-3xl  font-bold">10 $</h1>
        </div>

        <div class="mb-4 mx-4 ">
          <button
            type="button"
            className="flex justify-center items-center max-w-sm w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-xl uppercase shadow-md rounded-lg mx-auto p-2"
          >
            Submit A Bid
          </button>
        </div>
      </div>
    </div>
  );
}
