import React, { useContext, useEffect, useState } from "react";
import SubImgSlider from "./SubImgSlider";

import axios from "axios";
import ActionHistory from "./ActionHistory";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import { useLoaderData } from "react-router-dom";

export default function AdminProductDettailsCard() {
  const data = useLoaderData();

  const { currentUser } = useContext(AuthContext);

  const [subimageUrl, setSubImgUrl] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [bidEroo, setBidError] = useState("");

  const handlePriceChange = event => {
    setBidError("");
    const bidPrice = parseFloat(event.target.value);
    setNewPrice(bidPrice);
  };

  const handleSubimgShow = subimgUrl => {
    setSubImgUrl(subimgUrl);
  };

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
  const isBiddingClosed = remainingTime === "Bidding Close";

  const formatDateTime = dateTimeString => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };

    const dateTime = new Date(dateTimeString);

    if (isNaN(dateTime)) {
      // Handle invalid date input
      return "Invalid date";
    }

    const formattedDateTime = dateTime.toLocaleString("en-US", options);
    const [date, time] = formattedDateTime.split(", ");

    const formattedDate = date.replace(/\//g, "-");
    const formattedTime = time.toLowerCase();

    return `${formattedDate} ${formattedTime}`;
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${data._id}/winner`
        );

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch the winner initially
    fetchWinner();

    // Poll for winner updates every 10 seconds
    const interval = setInterval(() => {
      fetchWinner();
    }, 10000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [data._id]);

  return (
    <div>
      <div className="    mx-auto   ">
        <div className="flex  flex-col lg:flex-row    ">
          <div className="w-full px-4 lg:w-3/5 h-full  ">
            <div className=" h-64 lg:h-[500px]   ">
              {subimageUrl ? (
                <img
                  src={subimageUrl}
                  alt=""
                  className=" object-cover	  w-full h-full   "
                />
              ) : (
                <img
                  src={data?.mainImage}
                  alt=""
                  className="h-full  object-cover	  w-full   "
                />
              )}
            </div>

            <div className="mt-3">
              <a
                className="    text-center w-full  "
                target="_blank"
                href={data?.pdfFile}
                download="product-description"
              >
                <button
                  type="button"
                  className="  px- py-2.5 text-sm font-medium   w-full text-white bg-green-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 -green-600  "
                >
                  Download PDF
                </button>
              </a>
            </div>
          </div>
          <div className="w-full lg:w-2/5 text-left px-4  h-full lg:h-[600px]   overflow-auto     ">
            <SubImgSlider
              handleSubimgShow={handleSubimgShow}
              images={data.subImages}
            ></SubImgSlider>
          </div>
        </div>

        <div className="flex justify-between    flex-col ">
          <div className="w-full    capitalize">
            <div className="px-6">
              <h2 className="  mt-1 mb-6 text-xl font-bold text-black  text-left">
                {data.name}
              </h2>
              <p className="  mb-4 text-gray-700 text-left  ">
                {data?.description?.slice(0, 100)}

                <label
                  htmlFor="productDesc"
                  className=" underline cursor-pointer ml-3"
                >
                  ...Read more
                </label>

                <input
                  type="checkbox"
                  id="productDesc"
                  className="modal-toggle"
                />
                <div className="modal ">
                  <div className="modal-box bg-white text-black">
                    <h3 className="font-bold text-lg"></h3>
                    <p className="py-4">{data?.description}</p>
                    <div className="modal-action">
                      <label
                        htmlFor="productDesc"
                        className="btn bg-[#719f18]  text-white hover:bg-[#73471b]"
                      >
                        Close!
                      </label>
                    </div>
                  </div>
                </div>
              </p>
            </div>

            <div>
              <div className="  bg-white shadow-md px-6 py-6">
                <div className="flex justify-between items-center text-xl font-bold text-[#719f18]  ">
                  <span>Starting bid:</span>
                  <span>{data?.startBiddingPrice} $</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-[#719f18]  ">
                  <span>Current bidding Price:</span>

                  <span>
                    {data.bids &&
                      data.bids.length > 0 &&
                      data.bids[data.bids.length - 1].amount}
                    $
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full  my-6    bg-[#719f18]  rounded-lg  p-5">
            <div className="flex justify-center  flex-col lg:flex-row   items-center  text-xl text-left  ">
              <div className="text-center my-2">
                <h4 className="text-[#73471b]">This Auction Ends in</h4>
                <h2 className="text-[#73471b]">{remainingTime}</h2>
              </div>

              <div className="text-center my-2">
                <h4 className="text-[#73471b]">Start Bidding Time</h4>
                <h2 className="text-[#73471b]">
                  {formatDateTime(data.startBiddingTime)}
                </h2>
              </div>

              <div className="text-center my-2">
                <h4 className="text-[#73471b]"> End Bidding Time</h4>
                <h2 className="text-[#73471b]">
                  {formatDateTime(data.endBiddingTime)}
                </h2>
              </div>

              <div
                className="flex items-center my-5 text-white  flex-col justify-center text-xl   font-bold 
              "
              >
                <h1 className="text-white ">Total Bids</h1>
                <h1 className="text-white ">
                  {" "}
                  {data && data?.bids?.length
                    ? data?.bids?.length + "bids"
                    : "No Bids Available"}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div>
          {data?.winner ? (
            <div className="my-5">
              <h1 className="text-green-600  flex items-center justify-center text-xl">
                Winner
              </h1>

              <div className="flex justify-center items-center">
                <img
                  className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                  src={data?.winner?.bidderPhoto}
                  alt="Person"
                />
                <div className="flex flex-col items-start justify-center">
                  <p className="text-lg font-bold text-left">
                    {data?.winner?.bidderName}
                  </p>
                  <p className="text-sm text-gray-800 text-left">
                    Win Bid Price: {data?.winner?.amount}$
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-white text-lg text-black">Not Winner find yet</p>
          )}
          <ActionHistory bids={data?.bids}> </ActionHistory>{" "}
        </div>
      </div>
    </div>
  );
}
