import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product({ data }) {
  

  const calculateRemainingTime = endTime => {
    const currentTime = new Date().getTime();
    const endTimeValue = new Date(endTime).getTime();

    if (currentTime > endTimeValue) {
      return "Bidding Close";
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
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };

    const dateTime = new Date(dateTimeString).toLocaleString("en-US", options);
    const [date, time] = dateTime.split(", ");

    const formattedDate = date.replace(/\//g, "-");
    const formattedTime = time.toLowerCase();

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div>
      <div className=" m-auto mx-5 bg-white border border-gray-200 rounded-lg shadow  ">
        <div className="border ">
          <img
            className="rounded-t-lg w-full object-cover h-[150px] text-center   "
            src={data?.mainImage}
            alt=""
          />
          <div className="  bottom-0 text-center ">
            <h1>
              {isBiddingStartSoon(data.startBiddingTime) &&
              !isBiddingEnd(data.endBiddingTime) ? (
                <p className="text-md text-green-700  ">
                  Start Bidding Soon
                </p>
              ) : isBiddingEnd(data.endBiddingTime) ? (
                <p className="text-sm text-red-600 capitalize  ">
                  Bidding Ended
                </p>
              ) : (
                <p className="text-sm text-red-600 capitalize  ">
                  Bid Close : {calculateRemainingTime(data.endBiddingTime)}
                </p>
              )}{" "}
            </h1>
          </div>
        </div>

        <div className="p-2 text-left capitalize">
          <h5 className="mb-2 text-sm    tracking-tight text-black dark:text-black">
            {data?.name}
          </h5>

          <p className="mb-3 font-normal text-black dark:text-black">
           Category: <span className="font-bold">{data?.category}</span>
          </p>
          <div className="flex my-2 justify-between items-center">
            <p className="flex flex-col text-[#719f18]  items-center ">
              <span className="text-sm">Start Bidding Time</span>
              <span> {formatDateTime(data?.startBiddingTime)}</span>
            </p>
            <p className="flex text-[#73471b] flex-col items-center ">
              <span className="text-sm">End Bidding Time</span>
              <span> {formatDateTime(data?.endBiddingTime)}</span>
            </p>
          </div>
 <div className="flex justify-start items-center">
 <Link to={`/product/${data?._id}`}>
            <button className=" px-3 rounded-md text-sm border   border-black hover:bg-transparent hover:outline-dotted transition duration-300 ease-in-out justify-center items-center flex  bg-transparent text-black m-auto  ">
              show details
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2 -mr-1"
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
            </button>


            
          </Link>
 </div>

         
        </div>
      </div>
    </div>
  );
}
