import React, { useContext, useEffect, useState } from "react";
import SubImgSlider from "./SubImgSlider";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";
import axios from "axios";
import ActionHistory from "./ActionHistory";

export default function ProductDettailsCard({ data }) {
  

  const { currentUser } = useContext(AuthContext);
  const [subimageUrl, setSubImgUrl] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(10);
  const [newPrice, setNewPrice] = useState("");

  const handlePriceChange = event => {
    const bidPrice = parseFloat(event.target.value);
    setNewPrice(bidPrice);
  };

  const handlePlcebid = e => {
    e.preventDefault();

    if (newPrice >= currentPrice) {
      setCurrentPrice(newPrice);
    } else {
      alert("New price cannot be lower than the current price.");
    }

    const bidData = {
      bidAmount: newPrice,
      bidderName: currentUser?.name,
      bidderEmail: currentUser?.email,
      bidderId: currentUser?._id,
      bidderPhone: currentUser?.userPhoto,
      bidderNumber: currentUser?.phoneNumber,
      productId: data?._id
    };

    fetch(`http://localhost:5000/products/${data._id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bidData)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Bid placed successfully", data);
        // Clear bid amount field
      })
      .catch(error => {
        console.error("Error placing bid", error);
      });
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

  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${data._id}/winner`
        );
        setWinner(response.data.winner);
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

  if (loading) {
    return <p>Loading winner...</p>;
  }

  return (
    <div>
      <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex  flex-col lg:flex-row   ">
          <div className="w-full px-4 lg:w-3/5 h-full  ">
            <div className=" h-64 lg:h-[600px]   ">
              {subimageUrl ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/sub-images/${subimageUrl}`}
                  alt=""
                  className="  w-full h-full   "
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/main-images/${data?.mainImage}`}
                  alt=""
                  className="h-full    w-full   "
                />
              )}
            </div>
          </div>
          <div className="w-full lg:w-2/5 text-left px-4  h-full lg:h-[600px]   overflow-auto     ">
            <SubImgSlider
              handleSubimgShow={handleSubimgShow}
              images={data.subImages}
            ></SubImgSlider>
          </div>
        </div>

        <div className="flex justify-between  mt-10 flex-col lg:flex-row">
          <div className="w-full lg:w-2/3   capitalize">
            <div>
              <h2 className="  mt-1 mb-6 text-2xl font-bold  text-left md:text-4xl">
                {data.name}
              </h2>
              <p className="  mb-4 text-gray-700 text-left dark:text-gray-400">
                {data?.description}
              </p>
            </div>

            <div>
              <div className="mr-5 bg-slate-200">
                <div className="flex justify-between items-center text-xl font-bold text-green-600  dark:text-green-100">
                  <span>Starting bid:</span>
                  <span>{data?.startBiddingPrice} $</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-green-600  dark:text-green-100">
                  <span>Current bidding Price:</span>
                  <span>No Bids</span>
                </div>
              </div>

              <div className="mt-10">
                <div className="text-left">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Bid Now
                  </h5>
                  <p className="mb-1 font-normal text-gray-500 dark:text-gray-400">
                    Minimum Bid: {data?.minimumBid} $
                  </p>
                  <span className="w-16 h-1 bg-green-600 block"></span>
                </div>
                <form
                  onSubmit={handlePlcebid}
                  className="flex justify-between my-5 items-center"
                >
                  <div className="  w-full  ">
                    <input
                      type="number"
                      value={newPrice}
                      onChange={handlePriceChange}
                      min={data.minimumBid}
                      step="any"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="$00:00"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex lg:w-1/3 w-1/2 items-center mr-4 py-2.5 px-3 lg:px-8 ml-2 text-sm font-medium text-white bg-green-600 rounded-lg border border-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    Place Bid
                  </button>
                </form>
                <div className="flex  items-center lg:flex-row flex-col  justify-between ">
                  <a
                    className=" mx-3 my-2 text-center w-full  "
                    target="_blank"
                    href={`${process.env.REACT_APP_API_URL}/uploads/pdf-files/${data.pdfFile}`}
                    download="product-description"
                  >
                    <button
                      type="button"
                      className="  px-5 py-2.5 text-sm font-medium   w-full text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg--blue700 dark:focus:ring-green-800"
                    >
                      Download PDF
                    </button>
                  </a>
                  <button
                    type="button"
                    className=" mx-3 my-2 text-center w-full     py-2.5 text-sm font-medium   text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg--blue700 dark:focus:ring-green-800"
                  >
                    Buy now for
                    <span className="inline-flex items-center justify-center  ml-2 text-xs font-semibold text-white ">
                      {data?.buyNowPrice} $
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full   lg:w-1/3  border bg-slate-200 border-gray-300  rounded-lg  p-5">
            <div className="flex justify-center flex-col  items-center  text-xl text-left  ">
              <div className="text-center my-2">
                <h4 className="text-red-500">This Auction Ends in</h4>
                <h2 className="text-red-500">{remainingTime}</h2>
              </div>

              <div className="text-center my-2">
                <h4 className="text-green-600">Start Bidding Time</h4>
                <h2 className="text-green-600">
                  {formatDateTime(data.startBiddingTime)}
                </h2>
              </div>

              <div className="text-center my-2">
                <h4 className="text-red-500"> End Bidding Time</h4>
                <h2 className="text-red-500">
                  {formatDateTime(data.endBiddingTime)}
                </h2>
              </div>

              <div
                className="flex items-center my-5 text-green-500  flex-col justify-center text-4xl   font-bold 
              "
              >
                <h1>Total Bids</h1>
                <h>90 Bid</h>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ActionHistory bids={data?.bids}> </ActionHistory>
        </div>
      </div>
    </div>
  );
}
