import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";
 
import ImgSlide from "./ImgSlide";
import Koyel from "./Koyel/Koyel";
import SingelProductActionHistory from "./SingelProductActionHistory";

export default function SingelProductsDettails() {
  const { currentUser, user } = useContext(AuthContext);
  const data = useLoaderData();

  const [subimageUrl, setSubImgUrl] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [bidEroo, setBidError] = useState("");

  const handlePriceChange = event => {
    setBidError("");
    const bidPrice = parseFloat(event.target.value);
    setNewPrice(bidPrice);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const items = selectedItems?.map(skoyel => {
    return skoyel.bids && skoyel.bids.length === 0
      ? skoyel?.currentBid
      : skoyel.bids[skoyel.bids.length - 1].bidAmount;
  });
  const itemCurrentPrice = items.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue),
    0
  );

  const handlePlcebid = e => {
    e.preventDefault();
    // Prepare the bid data for selected items
    const koyelBids = selectedItems.map(item => ({
      koyelId: item._id,
      koyel: item,
      bidAmount: newPrice / selectedItems?.length,
      bidderName: currentUser?.name,
      bidderEmail: currentUser?.email,
      bidderId: currentUser?._id,
      bidderPhoto: currentUser?.userPhoto,
      bidderNumber: currentUser?.phoneNumber
    }));

    const bidder = {
      productName: data?.name,
      productID: data?._id,
      productPhoto: data?.mainImage,
      bidAmount: newPrice,
      bidderName: currentUser?.name,
      bidderEmail: currentUser?.email,
      bidderId: currentUser?._id,
      bidderPhoto: currentUser?.userPhoto,
      bidderNumber: currentUser?.phoneNumber
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/${data._id}/koyel/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ koyelBids, bidder })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Bid placed successfully", data);
        if (data.message) {
          toast.success(data.message);
          // window.location.reload(true);
          setNewPrice("");
        } else {
          toast.error(data.error);
          setBidError(data.error);
        }

        // Clear bid amount field
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
  const isBiddingClosed = remainingTime === "Bidding Close";

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

  ///get winner
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (data?._id) {
      fetch(`${process.env.REACT_APP_API_URL}/products/${data._id}/winner`)
        .then(res => res.json())
        .then(data => {
          console.log(data?.message);
        });
    }

    // Call the API every 10 seconds
  }, [data._id]);

  return (
    <div className="min-h-screen mt-10">
      <div className="flex  flex-col lg:flex-row    ">
        <div className="w-full   lg:w-2/5   h-[600px]    ">
          <div className="   w-full h-3/5   ">
            {subimageUrl ? (
              <img
                src={subimageUrl}
                alt=""
                className="  object-cover  w-full h-full  "
              />
            ) : (
              <img
                src={data?.mainImage}
                alt=""
                className=" h-full   object-cover  w-full   "
              />
            )}
          </div>
          <div className=" w-full h-3/5 ">
            <ImgSlide
              handleSubimgShow={handleSubimgShow}
              images={data.subImages}
            ></ImgSlide>
          </div>
        </div>
        <div className="w-full  lg:w-3/5 text-left px-4  h-[600px]   overflow-auto ">
          <h2 className="text-2xl text-green-500 text-center">
            Select Product
          </h2>
          <div>
            <Koyel
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              koyel={data?.koyel}
            ></Koyel>
          </div>
        </div>
      </div>
      <div className="flex justify-between  mt-10 flex-col-reverse lg:flex-row">
        <div className=" w-full   lg:w-2/5  border bg-slate-200 border-gray-300  rounded-lg  p-5">
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
              <h1>
                {" "}
                {data && data?.bids?.length
                  ? data?.bids?.length + "bids"
                  : "No Bids Available"}
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/5   capitalize">
          <div>
            <h2 className="  mt-1 mb-6 text-2xl font-bold  text-left md:text-4xl">
              {data.name}
            </h2>
            <p className="  mb-4 text-gray-700 text-left  ">
              {data?.description}
            </p>
          </div>

          <div>
            <div className="mr-5 bg-slate-200">
              <div className="flex justify-between items-center text-xl font-bold text-green-600   ">
                <span>Per Ton price:</span>
                <span>{data?.startBiddingPrice} $</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-green-600   ">
                <span>Current bidding Price:</span>

                <span>
                  {data.bids &&
                    data.bids.length > 0 &&
                    data.bids[data.bids.length - 1].amount}
                  $
                </span>
              </div>
            </div>

            <div className="mt-10">
              <div className="text-left">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900  ">
                  Bid Now
                </h5>
                <p className="mb-1 font-normal text-gray-500 ">
                  Minimum Bid: {data?.minimumBid} $
                </p>
                <span className="w-16 h-1 bg-green-600 block"></span>
              </div>
              {selectedItems.length !== 0 ? (
                <div>
                  Total item = {selectedItems.length} Total price{" "}
                  {itemCurrentPrice.toFixed(2)}
                </div>
              ) : (
                <div>select item and place bid</div>
              )}

              <form
                onSubmit={handlePlcebid}
                className="flex justify-between my-5 items-center"
              >
                <div className="  w-full  ">
                  <input
                    min={itemCurrentPrice + Number(data?.minimumBid)}
                    value={newPrice}
                    onChange={handlePriceChange}
                    type="number"
                    step="any"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  -gray-700     "
                    placeholder="$00:00"
                    required
                  />
                </div>

                <button
                  disabled={selectedItems.length === 0 || newPrice === ""}
                  className={`inline-flex lg:w-1/3 w-1/2 items-center mr-4 py-2.5 px-3 lg:px-8 ml-2 text-sm font-medium text-white bg-[#719f18] rounded-lg border border-green-600   focus:ring-4 focus:outline-none focus:ring-green-300 -green-600 `}
                >
                  Place Bid
                </button>
              </form>
              <p className="text-red-600 text-left ">{bidEroo}</p>
              <div className="flex  items-center lg:flex-row flex-col  justify-between ">
                <a
                  className=" mx-3 my-2 text-center w-full  "
                  target="_blank"
                  href={data?.pdfFile}
                  download="product-description"
                >
                  <button
                    type="button"
                    className="  px-5 py-2.5 text-sm font-medium   w-full text-white bg-green-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 -green-600  "
                  >
                    Download PDF
                  </button>
                </a>

                {data?.status === "sold out" ? (
                  <button className=" mx-3 my-2 text-center w-full     py-2.5 text-1sm font-medium  cursor-pointer  text-white bg-green-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 -green-600 ">
                    sold out
                  </button>
                ) : (
                  <Link
                    className=" mx-3 my-2 text-center w-full     py-2.5 text-1sm font-medium  cursor-pointer  text-white bg-green-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 -green-600 "
                    to={`/product/order/${data?._id}`}
                  >
                    <button disabled={isBiddingClosed} type="button">
                      Buy now for
                      <span className="inline-flex items-center justify-center  ml-2 text-xs font-semibold text-white ">
                        {data?.buyNowPrice} $
                      </span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SingelProductActionHistory bids={data?.bids}>
        {" "}
      </SingelProductActionHistory>{" "}
    </div>
  );
}
