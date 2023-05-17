import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import actionimg1 from "../../assets/auction (1).png";
import priceimg from "../../assets/price (2).png";

export default function Product({ data }) {
  const [uploadTime, setUploadTime] = useState(
    new Date("2023-05-18T10:00:00Z")
  );
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    const calculateRemainingTime = () => {
      const currentTime = new Date();
      const timeDifference = uploadTime - currentTime;

      if (timeDifference <= 0) {
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setRemainingTime({ hours, minutes, seconds });
    };

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className="card px-2 bg-base-100 shadow-xl">
        <figure className="  flex justify-center items-center ">
          <img
            src={data?.img}
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
                  Submit A Bid
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
