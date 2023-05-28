import React from "react";
import actionimg1 from "../../assets/auction (1).png";
import price from "../../assets/price (2).png";
import { Link } from "react-router-dom";

export default function UpcommingProductCard({data}) {

  const { _id, mainImage, name, buyNowPrice, startBiddingTime } = data;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-300">
      <div className="w-full   lg:w-1/4">
        <img className="w-full h-full" alt="img" src={mainImage} />
      </div>
      <div className="w-full lg:w-1/2 px-4 mt-4 lg:mt-0">
        <div className=" text-left lg:text-center">
          <h2
            className="text-lg my-3  font-bold
          "
          >
            {name}
          </h2>
          <div className="flex  justify-start lg:justify-center items-center my-4">
            <p className="border-r-2  mr-3 pr-2 border-emerald-500   ">
              <span className="text lg font-bold">Listing ID:</span> {_id}
            </p>
          </div>
        </div>
        <hr />

        <div className="flex  justify-start lg:justify-center items-start lg:items-center py-5 ">
          <div className="flex ml-2">
            <img className="w-10 h-10" alt="action" src={price} />
            <div className="ml-2 text-lg font-semibold">
              <h2 className="text-red-600">Buy now</h2>
              <h1>{buyNowPrice} $</h1>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="w-full lg:w-1/4 bg-slate-200">
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 py-2 text-green-600">
            Start Bidding
          </h2>
          <h4 className="text-red-500 text-lg ">{startBiddingTime}</h4>
        </div>

        <div className="mb-4 mx-4 ">
          <Link to={`/action/${_id}`}>
            <button
              type="button"
              className="flex justify-center items-center max-w-sm w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-xl uppercase shadow-md rounded-lg mx-auto p-2"
            >
              Submit A Bid
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
