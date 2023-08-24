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
    <div className="  px-5 lg:px-12">
      {/* <div className="flex  flex-col lg:flex-row    ">
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
          <div className=" w-full h-[250px] overflow-hidden mb-4   ">
            <SubImgSlider
              handleSubimgShow={handleSubimgShow}
              images={data.subImages}
            ></SubImgSlider>
          </div>
        </div>
        <div className="w-full  lg:w-3/5 text-left  lg:px-6 p-3   ">
          <div>
            <div className="">
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
                        Download Product
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

            <div className=" w-full    mt-3    shadow-2xl   rounded-lg  p-5">
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
          </div>
        </div>
      </div> */}
      <section class=" overflow-hidden bg-white font-poppins dark:bg-white">
        <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 md:w-1/2 ">
              <div class="sticky top-0 z-50 overflow-hidden ">
                <div class="relative  lg:mb-10 h-[450px]">
                  {subimageUrl ? (
                    <img
                      src={subimageUrl}
                      alt=""
                      className="  object-contain  w-full h-full  "
                    />
                  ) : (
                    <img
                      src={data?.mainImage}
                      alt=""
                      className=" h-full   object-contain  w-full   "
                    />
                  )}
                </div>
                <div class="flex-wrap lg:flex  md:flex ">
                  <div class="">
                    <SubImgSlider
                      handleSubimgShow={handleSubimgShow}
                      images={data.subImages}
                    ></SubImgSlider>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2 ">
              <div class="lg:pl-20">
                <div class="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                  <span class="text-lg font-medium text-rose-500 dark:text-rose-200">
                    New
                  </span>
                  <h2 class="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                    Long-Sleeved T-shirt
                  </h2>
                  <div class="flex flex-wrap items-center mb-6">
                    <ul class="flex mb-4 mr-2 lg:mb-0">
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <a
                      class="mb-4 text-xs underline dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0"
                      href="#"
                    >
                      Be the first to review the product
                    </a>
                  </div>
                  <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor
                    amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum
                    dor amet Lorem ispum dor amet Lorem ispum dor amet
                  </p>
                  <div class="p-4 mb-8 border border-gray-300 dark:border-gray-700">
                    <h2 class="mb-4 text-xl font-semibold dark:text-gray-400">
                      Real time{" "}
                      <span class="px-2 bg-orange-500 text-gray-50">26</span>
                      visitors right now!{" "}
                    </h2>
                    <div class="mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">
                      Hurry up! left 23 in Stock
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-600">
                      <div class="bg-orange-600 w-[45%] dark:bg-orange-400 h-2.5 rounded-full"></div>
                    </div>
                  </div>
                  <p class="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>$994.00</span>
                    <span class="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      $1500.00
                    </span>
                  </p>
                </div>
                <div class="mb-8">
                  <h2 class="mb-2 text-xl font-bold dark:text-gray-400">
                    Color
                  </h2>
                  <div class="flex flex-wrap -mb-2">
                    <button class="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                      <div class="w-6 h-6 bg-red-600 rounded-full"></div>
                    </button>
                    <button class="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                      <div class="w-6 h-6 bg-green-600 rounded-full"></div>
                    </button>
                    <button class="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                      <div class="w-6 h-6 bg-yellow-500 rounded-full"></div>
                    </button>
                    <button class="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                      <div class="w-6 h-6 rounded-full bg-sky-400"></div>
                    </button>
                  </div>
                </div>
                <div class="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700">
                  <h2 class="mb-2 text-xl font-bold dark:text-gray-400">
                    Size
                  </h2>
                  <div class="flex flex-wrap -mb-2">
                    <button class="py-1 mb-2 mr-1 border w-11 hover:border-orange-400 dark:border-gray-400 hover:text-orange-600 dark:hover:border-gray-300 dark:text-gray-400">
                      XL
                    </button>
                    <button class="py-1 mb-2 mr-1 border w-11 hover:border-orange-400 hover:text-orange-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                      S
                    </button>
                    <button class="py-1 mb-2 mr-1 border w-11 hover:border-orange-400 hover:text-orange-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                      M
                    </button>
                    <button class="py-1 mb-2 mr-1 border w-11 hover:border-orange-400 hover:text-orange-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                      XS
                    </button>
                  </div>
                </div>
                <div class="flex flex-wrap items-center ">
                  <div class="mb-4 mr-4 lg:mb-0">
                    <div class="w-28">
                      <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                        <button class="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                          <span class="m-auto text-2xl font-thin">-</span>
                        </button>
                        <input
                          type="number"
                          class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                          placeholder="1"
                        />
                        <button class="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                          <span class="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4 mr-4 lg:mb-0">
                    <button class="w-full h-10 p-2 mr-4 bg-orange-500 dark:text-gray-200 text-gray-50 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500">
                      Buy Now
                    </button>
                  </div>
                  <div class="mb-4 mr-4 lg:mb-0">
                    <button class="flex items-center justify-center w-full h-10 p-2 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-orange-600 hover:bg-orange-600 hover:border-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 dark:hover:border-orange-500 dark:hover:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-cart"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                    </button>
                  </div>
                  <div class="mb-4 lg:mb-0">
                    <button class="flex items-center justify-center w-full h-10 p-2 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-orange-600 hover:bg-orange-600 hover:border-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 dark:hover:border-orange-500 dark:hover:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class=" bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-between   mt-20 flex-col-reverse lg:flex-row">
        <Koyel
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          koyel={data?.koyel}
        ></Koyel>

        <div>shipment system</div>
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
