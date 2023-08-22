import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";

import Koyel from "./Koyel/Koyel";
import SingelProductActionHistory from "./SingelProductActionHistory";
import BuyNow from "./BuyNowKoyelItem/BuyNow";
import SubImgSlider from "../SubImgSlider";

export default function SingelProductsDettails() {
  const { currentUser, user } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();

  const [subimageUrl, setSubImgUrl] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [bidEroo, setBidError] = useState("");

  const handlePriceChange = event => {
    setBidError("");
    const bidPrice = parseFloat(event.target.value);
    setNewPrice(bidPrice);
  };

  ////selected  item
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
  /// img    slider
  const handleSubimgShow = subimgUrl => {
    setSubImgUrl(subimgUrl);
  };

  ///  remmenint time
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

  useEffect(() => {
    if (data?._id) {
      fetch(
        `${process.env.REACT_APP_API_URL}/products/${data?._id}/koyel/winner`
      )
        .then(res => res.json())
        .then(data => {});
    }
  }, [data._id]);

  ///place bid
  const handlePlcebid = e => {
    e.preventDefault();

    if (!currentUser || !user) {
      return navigate("/login");
    } else if (user?.emailVerified === "false") {
      return alert("Please  check your email and noreply! and verify email");
    } else if (currentUser?.role !== "bidder") {
      return alert("please waiting for admin approval");
    } else if (selectedItems.length === 0) {
      return alert("Please select items"), setBidError("Please select items");
    }

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (selectedItems.length === 0 || selectedItems.length < 0) {
      return alert("Please select items");
    } else if (!currentUser || !user) {
      return navigate("/login");
    } else if (user?.emailVerified === "false") {
      return alert("Please  check your email and noreply! and verify email");
    } else if (currentUser?.role !== "bidder") {
      return alert("please waiting for admin approval");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" mt-10 px-5 lg:px-12">
      <div className="flex  flex-col lg:flex-row    ">
        <div className="w-full   lg:w-2/5   h-[600px]  mb-5   ">
          <div className="   w-full h-3/5    mb-4">
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
          <div className=" w-full h-[250px] overflow-auto grid  mb-4 gap-4 grid-cols-1  ">
            <SubImgSlider
              handleSubimgShow={handleSubimgShow}
              images={data.subImages}
            ></SubImgSlider>
          </div>
        </div>
        <div className="w-full  lg:w-3/5 text-left px-1   ">
          <h2 className="text-2xl text-[#719f18] text-center">Select Items</h2>
          <div>
            {/* <Koyel
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              koyel={data?.koyel}
            ></Koyel> */}
          </div>
        </div>
      </div>
      <div className="flex justify-between   mt-20 flex-col-reverse lg:flex-row">
        <div className=" w-full   lg:w-2/5  mt-3  bg-[#719f18]  shadow-2xl   rounded-lg  p-5">
          <div className="flex justify-center flex-col  items-center  text-xl text-left  ">
            <div className="text-center my-2">
              <h4 className="text-[#73471b]">This Auction Ends in</h4>
              <h2 className="text-[#73471b]">{remainingTime}</h2>
            </div>

            <div className="text-center my-2">
              <h4 className="text-white">Start Bidding Time</h4>
              <h2 className="text-white">
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
        <div className="w-full lg:w-3/5 lg:px-8   capitalize">
          <div>
            <h2 className="  mt-1 mb-6 text-2xl font-bold text-black  text-left md:text-4xl">
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
            <div className="mr-5  shadow-lg">
              <div className="flex justify-between items-center text-xl font-bold text-[#719f18]   ">
                <span>Per Ton price:</span>
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
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black  ">
                  Bid Now
                </h5>
                <p className="mb-1 font-normal text-black ">
                  Minimum Bid: {data?.minimumBid} $
                </p>
                <span className="w-16 h-1 bg-[#719f18] block"></span>
              </div>
              {selectedItems.length !== 0 ? (
                <div className="text-black">
                  Total item = {selectedItems.length} Total price{" "}
                  {itemCurrentPrice.toFixed(2)}
                </div>
              ) : (
                <div className="text-[#719f18] capitalize text-md font-semibold">
                  select items then place Bid & Buy
                </div>
              )}

              <p className="text-red-600 text-center font-md font-semibold ">
                {bidEroo}
              </p>
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
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg   block w-full pl-10 p-2.5  -gray-700     "
                    placeholder="$00:00"
                    required
                  />
                </div>

                <button
                  className={`inline-flex lg:w-1/3 w-1/2 items-center mr-4 py-2.5 px-3 lg:px-8 ml-2 text-sm font-medium text-white bg-[#719f18] rounded-lg border  `}
                >
                  Place Bid
                </button>
              </form>

              <div className="flex  items-center lg:flex-row flex-col  justify-between ">
                <a
                  className=" mx-3 my-2 text-center w-full  "
                  target="_blank"
                  href={data?.pdfFile}
                  download="product-description.xlsx"
                >
                  <button
                    type="button"
                    className="  px-5 py-3.5 rounded-md text-sm font-medium   w-full text-white bg-[#719f18] hover:bg-[#73471b]  "
                  >
                    Download  Product
                  </button>
                </a>

                <div className="w-full">
                  <button
                    onClick={() => openModal()}
                    className="w-full   btn bg-[#719f18] hover:bg-[#73471b] text-white font-semibold"
                  >
                    Buy Now{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <BuyNow
            close={closeModal}
            id={data?._id}
            data={selectedItems}
          ></BuyNow>
        )}
      </div>
      <SingelProductActionHistory bids={data?.bids}>
        {" "}
      </SingelProductActionHistory>{" "}
    </div>
  );
}
