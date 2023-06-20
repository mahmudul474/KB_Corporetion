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
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">
        <div className="border ">
          <img
            className="rounded-t-lg w-full text-center h-60 object-contain "
            src={data?.mainImage}
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

        <div className="p-5 text-left capitalize">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
            {data?.name}
          </h5>

          <p className="mb-3 font-normal text-black dark:text-black">
            {data?.description}
          </p>
          <div className="flex my-2 justify-between items-center">
            <p className="flex flex-col text-green-500  items-center ">
              <span>Start Bidding Time</span>
              <span> {formatDateTime(data?.startBiddingTime)}</span>
            </p>
            <p className="flex text-red-700 flex-col items-center ">
              <span>End Bidding Time</span>
              <span> {formatDateTime(data?.endBiddingTime)}</span>
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              Bidding Price: {data.startBiddingPrice}
            </h2>

            {data?.key === "koyel" ? (
              <Link to={`/excel/${data._id}`}>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  View Details
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
            ) : (
              <Link to={`/action/${data._id}`}>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  View Details
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
