import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import EditProductPopUp from "./ProductEditPopup/EditProductPopUp";

export default function ProductCard({ data, refetch,   setDeleteProduct, openConfirmationPopup }) {
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

  const [editProduct, setEditProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow   ">
        <div className="border ">
          <img
            className="rounded-t-lg w-full text-center h-60 object-cover "
            src={data?.mainImage}
            alt=""
          />
          <div className="  bottom-0 text-center ">
            <h1>
              {isBiddingStartSoon(data.startBiddingTime) &&
              !isBiddingEnd(data.endBiddingTime) ? (
                <p className="text-lg text-[#719f18]  font-semibold">
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
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
            {data?.name}
          </h5>

          <div className="flex items-center  ">
            <img
              className="w-10 mr-2 h-10 rounded-full"
              src={data?.authorPhoto}
              alt=""
            />
            <div className="font-medium  ">
              <div className="text-black">{data?.author}</div>
              <div className="text-sm text-black ">{data?.authorEmail}</div>
            </div>
          </div>
          <div className="flex my-2 justify-between items-center">
            <p className="flex flex-col text-[#719f18]  items-center ">
              <span>Start Bidding Time</span>
              <span> {formatDateTime(data.startBiddingTime)}</span>
            </p>
            <p className="flex text-[#73471b] flex-col items-center ">
              <span>End Bidding Time</span>
              <span> {formatDateTime(data.endBiddingTime)}</span>
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              Bidding Price: {data.startBiddingPrice} ${" "}
            </h2>

            <Link to={`/admin-dashboard/action/${data._id}`}>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#719f18] rounded-lg hover:bg-[#73471b]     ">
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
          </div>

          <div className=" flex   mt-3  justify-between flex-row items-center">
            <button
              onClick={() => {
                setEditProduct(data);
                openPopup();
              }}
              type="button"
              className="text-white bg-[#73471b] hover:bg-[#719f18] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
            >
              <span>
                <FiEdit></FiEdit>
              </span>
              Edit
            </button>
            <button
              onClick={() => {
                setDeleteProduct(data);
                openConfirmationPopup();
              }}
              type="button"
              className="text-white   bg-red-600   focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <span>
                <AiOutlineDelete></AiOutlineDelete>
              </span>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div>
        {showPopup && (
          <EditProductPopUp
            data={editProduct}
            refetch={refetch}
            onClose={closePopup}
          />
        )}
      </div>
    </div>
  );
}
