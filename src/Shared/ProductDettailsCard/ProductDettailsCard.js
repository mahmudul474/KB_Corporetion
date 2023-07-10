import React, { useContext, useEffect, useState } from "react";
import SubImgSlider from "./SubImgSlider";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";
import axios from "axios";
import ActionHistory from "./ActionHistory";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ProductDettailsCard({ data }) {
  const { currentUser, user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const navigate = useNavigate();

  const [subimageUrl, setSubImgUrl] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [bidEroo, setBidError] = useState("");

  const handlePriceChange = event => {
    setBidError("");
    const bidPrice = parseFloat(event.target.value);
    setNewPrice(bidPrice);
  };

  ///img slider
  const handleSubimgShow = subimgUrl => {
    setSubImgUrl(subimgUrl);
  };

  ///counterdown  remening time
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

  //get winner

  //palce bid
  const handlePlcebid = e => {
    e.preventDefault();

    if (!currentUser || !user) {
      return navigate("/login");
    } else if (user?.emailVerified === "false") {
      return alert("Please  check your email and noreply! and verify email");
    } else if (currentUser?.role !== "bidder") {
      return alert("please waiting for admin approval");
    }

    const bidData = {
      bidAmount: newPrice,
      bidderName: currentUser?.name,
      bidderEmail: currentUser?.email,
      bidderId: currentUser?._id,
      bidderPhoto: currentUser?.userPhoto,
      bidderNumber: currentUser?.phoneNumber,
      productName: data.name,
      productPhoto: data.mainImage
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/${data._id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bidData)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Bid placed successfully", data);
        if (data.message) {
          toast.success(data.message);
          window.location.reload(true);
          setNewPrice("");
        } else {
          toast.error(data.error);
          setBidError(data.error);
        }

        // Clear bid amount field
      })
      .catch(error => {
        console.error("Error placing bid", error);
      });
  };

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
    <div className="max-w-6xl  mx-auto my-16  ">
      <div className="flex  flex-col lg:flex-row   ">
        <div className="w-full mb-3 px-4 lg:w-3/5 h-full  ">
          <div className=" h-64 lg:h-[600px]   ">
            {subimageUrl ? (
              <img
                src={subimageUrl}
                alt=""
                className="  object-cover  w-full h-full   "
              />
            ) : (
              <img
                src={data?.mainImage}
                alt=""
                className="h-full  object-cover  w-full   "
              />
            )}
          </div>
        </div>
        <div className="w-full lg:w-2/5 text-left px-4   md:h-[500px] h-[200px]  lg:h-[600px]   overflow-auto     ">
          <SubImgSlider
            handleSubimgShow={handleSubimgShow}
            images={data.subImages}
          ></SubImgSlider>
        </div>
      </div>
      <div className="flex justify-between md:mx-5  sm:mx-5  mt-10 flex-col lg:flex-row">
        <div className="w-full lg:w-2/3   capitalize">
          <div>
            <h2 className="  text-black  mt-1 mb-6 text-2xl font-bold  text-left md:text-4xl">
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
            <div className="mr-5 bg-white shadow-2xl p-3">
              <div className="flex justify-between items-center text-xl font-bold text-[#719f18]   ">
                <span>Starting bid:</span>
                <span>{data?.startBiddingPrice} $</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-[#719f18]   ">
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
                <span className="w-16 h-1 bg-[#719f18] block"></span>
              </div>
              <p className="text-red-600  text-center  capitalize">{bidEroo}</p>
              <form
                onSubmit={handlePlcebid}
                className="flex justify-between my-5 items-center"
              >
                <div className="  w-full  ">
                  <input
                    type="number"
                    value={newPrice}
                    onChange={handlePriceChange}
                    min={data.startBiddingPrice}
                    step="any"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  -gray-700      "
                    placeholder="$00:00"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex lg:w-1/3 w-1/2 items-center mr-4 py-2.5 px-3 lg:px-8 ml-2 text-sm font-medium text-white bg-[#719f18] rounded-lg border border-[#719f18] hover:bg-[#73471b] focus:ring-4 focus:outline-none focus:ring-green-300 -[#719f18] "
                >
                  {data?.status === "sold out" ? "sold out" : " Place Bid"}
                </button>
              </form>

              <div className="flex  items-center lg:flex-row flex-col  justify-between ">
                <a
                  className=" mx-3 my-2 text-center w-full  "
                  target="_blank"
                  href={data?.pdfFile}
                  download="product-description"
                >
                  <button
                    type="button"
                    className="  px-5 py-2.5 text-sm font-medium hover:bg-[#73471b]  w-full text-white bg-[#719f18] rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 -[#719f18]  "
                  >
                    Download PDF
                  </button>
                </a>

                {data?.status === "sold out" ? (
                  <button className=" mx-3 my-2 text-center w-full     py-2.5 text-1sm font-medium  cursor-pointer  text-white bg-[#719f18]   rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 -[#719f18] ">
                    sold out
                  </button>
                ) : (
                  <Link
                    className=" mx-3 my-2 text-center w-full     py-2.5 text-1sm font-medium  cursor-pointer  text-white bg-[#719f18] hover:bg-[#73471b]  rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 -[#719f18] "
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
        <div className=" w-full   lg:w-1/3  border bg-[#719f18] text-white rounded-lg  p-5">
          <div className="flex justify-center flex-col  items-center  text-xl text-left  ">
            <div className="text-center my-2">
              <div className="my-5">
                <h1 className="  flex items-center justify-center text-xl">
                  Winner{" "}
                </h1>
                {data?.winner ? (
                  <div className="flex">
                    <img
                      className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                      src={data?.winner?.bidderPhoto}
                      alt="Person"
                    />
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-lg font-bold  text-left">
                        {data?.winner?.bidderName}
                      </p>
                      <p className="text-sm  text-left">
                        Win Bid Price: {data?.winner?.amount}$
                      </p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-white"> waiting for bidding end </h2>
                )}
              </div>

              <h4 className=" text-[#73471b]">This Auction Ends in</h4>
              <h2 className=" text-[#73471b]">{remainingTime}</h2>
            </div>

            <div className="text-center my-2">
              <h4 className="text-white">Start Bidding Time</h4>
              <h2 className="text-[white]">
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
              className="flex items-center my-5 text-[#719f18]  flex-col justify-center text-xl   font-bold 
              "
            >
              <h1 className="text-white">Total Bids</h1>
              <h1 className="text-white">
                {data && data?.bids?.length
                  ? data?.bids?.length + " " + "bids"
                  : "No Bids Available"}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <ActionHistory bids={data?.bids}> </ActionHistory>{" "}
    </div>
  );
}
