import React, { useEffect, useState } from "react";
import actionimg1 from "../../assets/auction (1).png";
import price from "../../assets/price (2).png";
import { Link } from "react-router-dom";

export default function UpcommingProductCard({ data }) {
  const { _id, mainImage, name, koyel, startBiddingTime, endBiddingTime } =
    data;

  

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
    <div className="bg-white rounded-lg shadow-lg lg:h-[400px] p-6 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-300">
      <div className="w-full   lg:w-1/4">
        <img className="w-full h-full object-cover" alt="img" src={mainImage} />
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

        <div className="overflow-auto h-[260px]">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead className="">
              <tr className="dark:bg-white dark:text-black">
                <td> ITEM</td>
                <td> SPEC</td>
                <td> THICKNESS</td>
                <td> WIDTH</td>
                <td> Weight</td>
                <td> TS</td>
                <td> YP</td>
                <td> EL</td>
              </tr>
            </thead>
            <tbody>
              {koyel?.map(item => (
                <tr key={item?._id}>
                  <td>{item?.item}</td>
                  <td>{item?.spec}</td>
                  <td>{item?.Thickness}</td>
                  <td>{item?.Width}</td>
                  <td>{item?.weight}</td>
                  <td>{item?.TS}</td>
                  <td>{item?.YP}</td>
                  <td>{item?.EL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr></hr>
      </div>
      <div className="w-full lg:w-1/4 bg-slate-200">
        <div className="mt-5">
          <h2 className="text-lg font-bold mb-2 py-2 text-green-600">
            Start Bidding
          </h2>
          <h4 className="text-red-500 text-lg ">{startBiddingTime}</h4>
        </div>

        <div className="">
          <h2 className="text-lg font-bold mb-2 py-2 text-green-600">
            End Bidding
          </h2>
          <h4 className="text-red-500 text-lg ">{endBiddingTime}</h4>
        </div>

        <div className="  bottom-0 text-center  my-3">
          <h1 className="text-[#73471b] text-xl  capitalize font-semibold">
            Remaining Time
          </h1>
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

        <div className="mb-4 mx-4 ">
          <Link to={`/excel/${data?._id}`}>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-[#719f18] hover:bg-[#73471b] text-white font-semibold">
              Place a Bid
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
