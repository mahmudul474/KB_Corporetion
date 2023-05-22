import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import actionimg1 from "../../assets/auction (1).png";
import priceimg from "../../assets/price (2).png";

export default function Product({ data }) {
  /////

  const calculateRemainingTime = endTime => {
    const currentTime = new Date().getTime();
    const endTimeValue = new Date(endTime).getTime();

    if (currentTime > endTimeValue) {
      return "Bidding Ended";
    }

    const remainingTime = endTimeValue - currentTime;

    // Convert remaining time to days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(data.endBiddingTime)
  );
  console.log(remainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(data.endBiddingTime));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data.endBiddingTime]);

  const isBiddingStartSoon = startTime => {
    const currentTime = new Date().getTime();
    const startTimeValue = new Date(startTime).getTime();

    return currentTime < startTimeValue;
  };

  const isBiddingEnd = endTime => {
    const currentTime = new Date().getTime();
    const endTimeValue = new Date(endTime).getTime();

    return currentTime > endTimeValue;
  };

  const formatDateTime = dateTimeString => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <div>
      {/* <div className="card px-2 bg-base-100 shadow-xl">
        <figure className="  flex justify-center items-center ">
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/main-images/${data?.mainImage}`}
            alt="Shoes"
            className="rounded-xl object-cover w-full h-48"
          />
        </figure>
        <div className="card-body py-5 items-center text-left px-3">
          <h2 className="card-title text-xl  capitalize my-3 font-semibold">
            {data.title}
          </h2>

          <hr className=""></hr>

          <div className="flex justify-between items-center py-5 ">
            <div className="flex">
              <img className="w-10 h-10" alt="action" src={actionimg1} />
              <div className="ml-2 text-lg font-semibold">
                <h2 className="text-green-600">Current Bid</h2>
                <h1>{data.CurentBid} $</h1>
              </div>
            </div>
            <span className="w-[2px] h-10 bg-green-600"></span>
            <div className="flex">
              <img className="w-10 h-10" alt="action" src={priceimg} />
              <div className="ml-2 text-lg font-semibold">
                <h2 className="text-red-600">Buy now</h2>
                <h1>{data.buyPrice} $</h1>
              </div>
            </div>
          </div>

          <hr className=""></hr>

          <div className="flex justify-between text-2xl items-center my-4">
            <h2 className="text-red-500">
              {" "}
              {remainingTime.hours.toString().padStart(2, "0")} h :{" "}
              {remainingTime.minutes.toString().padStart(2, "0")} m :{" "}
              {remainingTime.seconds.toString().padStart(2, "0")}s
            </h2>
            <span className="w-[2px] h-6 bg-green-600"></span>
            <h2 className="text-green-600">{data.CurentBid} Bids</h2>
          </div>

          <div className="card-actions">
            <div class="mb-4">
              <Link to={`/action/${data._id}`}>
                <button
                  type="button"
                  className="flex justify-center items-center max-w-sm w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-xl uppercase shadow-md rounded-lg mx-auto p-2"
                >
                  view details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="border ">
          <img
            class="rounded-t-lg w-full text-center h-60 object-contain "
            src={`${process.env.REACT_APP_API_URL}/uploads/main-images/${data?.mainImage}`}
            alt=""
          />
          <div className="  bottom-0 text-center ">
            <h1>
              {isBiddingStartSoon(data.startBiddingTime) &&
              !isBiddingEnd(data.endBiddingTime) ? (
                <p className="text-lg text-green-700  font-semibold">
                  Start Bidding Soon
                </p>
              ) : isBiddingEnd(data.endBiddingTime) ? (
                <p className="text-lg text-red-600 capitalize  font-semibold">
                  Bidding Ended
                </p>
              ) : (
                <p className="text-lg text-red-600 capitalize  font-semibold">
                  Bid Close : {calculateRemainingTime(data.endBiddingTime)}
                </p>
              )}{" "}
            </h1>
          </div>
        </div>

        <div class="p-5 text-left capitalize">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data?.name}
          </h5>

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data?.description.slice(0, 150)} <Link> ...</Link>
          </p>

          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              Bidding Price: {data.startBiddingPrice} ${" "}
            </h2>
            <p
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Details
              <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
