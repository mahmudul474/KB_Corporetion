import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";
import SubImgSlider from "../../../Shared/ProductDettailsCard/SubImgSlider";
import Koyel from "../../../Shared/ProductDettailsCard/SingelProductDettailsCard/Koyel/Koyel";
import BuyNow from "../../../Shared/ProductDettailsCard/SingelProductDettailsCard/BuyNowKoyelItem/BuyNow";
import SingelProductActionHistory from "../../../Shared/ProductDettailsCard/SingelProductDettailsCard/SingelProductActionHistory";
import { useTranslation } from "../../../Component/TranslationProvider/TranslationProvider";
import ButtonSpiner from "../../../Component/ButtonSpiner/ButtonSpiner";

export default function ProductBidding({ data }) {
  const { currentUser, user } = useContext(AuthContext);
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPriceType, setSelectedPriceType] = useState("");
  const [shippingCost, setShippingCost] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

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
    } else if (selectedDate === "") {
      return alert("Please select  date");
    } else if (landingValue === "") {
      return alert("Please select landing ");
    } else if (shipmentTypeValue === "") {
      return alert("Please select shipment type");
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  ////shopping cost

  useEffect(() => {
    if (selectedLocation in data?.ShippingCost) {
      const price =
        selectedPriceType === "container"
          ? data?.ShippingCost[selectedLocation].containerPrice
          : data?.ShippingCost[selectedLocation].bulkPrice || 0; // Default to 0 if bulk price is not available
      setShippingCost(price);
    }
  }, [selectedLocation, selectedPriceType]);

  const handleLocationChange = e => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);

    // If Dhaka is selected, reset the price type to "container"
    if (newLocation === "dhaka") {
      setSelectedPriceType("container");
    }
  };

  const handlePriceTypeChange = e => {
    setSelectedPriceType(e.target.value);
  };

  ///totals  wit price and bid
  const totals = selectedItems?.reduce(
    (accumulator, currentItem) => {
      // Convert the strings to numbers before multiplication
      const currentBidNumber = parseFloat(
        itemCurrentPrice
          ? itemCurrentPrice.toFixed(2) / selectedItems.length
          : currentItem.currentBid
      );
      const currentBuyNowNumber = parseFloat(currentItem.buyNowPrice);
      // Calculate the bid and buy totals for the current item
      const bidPrice = currentBidNumber * currentItem.weight;
      const buyNowPrice = currentBuyNowNumber * currentItem.weight;
      // Accumulate the totals for biddingTotal and buyingTotal
      accumulator.biddingTotal += bidPrice;
      accumulator.buyingTotal += buyNowPrice;
      // Accumulate the weight
      accumulator.weight += currentItem.weight;

      return accumulator;
    },
    { biddingTotal: 0, buyingTotal: 0, weight: 0 } // Initial accumulator values
  );

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
    } else if (newPrice === totals?.biddingTotal) {
      return setBidError(`please  bidding minimum ${data?.minimumBid + "$"}`);
    } else if (newPrice < totals?.biddingTotal) {
      return setBidError(
        `you can not bidding less than${totals?.biddingTotal + "$"}`
      );
    } else if (selectedDate === null) {
      setBidError("please select expected date");
      return toast.error("please select expected date");
    } else if (selectedLocation === "") {
      setBidError("please select   landing ");
      return toast.error("please select   landing");
    } else if (selectedPriceType === "") {
      setBidError("please select   shipment type ");
      return toast.error("please select   shipment type");
    }
    setIsloading(true);
    // Prepare the bid data for selected items
    const koyelBids = selectedItems.map(item => ({
      koyelId: item._id,
      koyel: item,
      bidAmount: newPrice / totals?.weight,
      bidderName: currentUser?.name,
      bidderEmail: currentUser?.email,
      bidderId: currentUser?._id,
      bidderPhoto: currentUser?.userPhoto,
      bidderNumber: currentUser?.phoneNumber
    }));

    const createBids = {
      items: selectedItems,
      productName: data?.name,
      productID: data?._id,
      productPhoto: data?.mainImage,
      bidAmount: newPrice,
      weight: totals?.weight,
      biddingTotal: totals?.biddingTotal,
      buyNowPrice: totals?.buyingTotal,
      perkgPrice: newPrice / totals?.weight,
      bidderName: currentUser?.name,
      bidderEmail: currentUser?.email,
      bidderId: currentUser?._id,
      bidderPhoto: currentUser?.userPhoto,
      bidderNumber: currentUser?.phoneNumber,
      shipping: {
        landing: selectedLocation,
        shippingType: selectedPriceType,
        shippingCost: shippingCost
      }
    };

    fetch(`http://localhost:5000/product/${data?._id}/bid/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ koyelBids, createBids })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          toast.success(data.message);
          window.location.reload(true);
          setNewPrice("");
          setIsloading(false);
        } else {
          toast.error(data.error);
          setBidError(data.error);
          setIsloading(false);
        }
      });
  };

  return (
    <div className="  px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <section className=" overflow-hidden bg-white font-poppins dark:bg-white">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative  lg:mb-10 h-[450px]">
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
                <div className="flex-wrap lg:flex  md:flex ">
                  <div className="">
                    <SubImgSlider
                      handleSubimgShow={handleSubimgShow}
                      images={data.subImages}
                    ></SubImgSlider>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20">
                <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="  mt-1 mb-6 text-2xl font-bold text-black capitalize  text-left md:text-4xl">
                      {data.name}
                    </h2>
                    <h2 className="     text-md font-bold text-black  text-left">
                      {translate("navbar", "cr")} Type : {data?.category}
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
                              className="btn bg-[#719f18]   hover:bg-[#73471b]"
                            >
                              Close!
                            </label>
                          </div>
                        </div>
                      </div>
                    </p>
                  </div>

                  <div className="p-4 mb-8 border dark:border-gray-700">
                    <div className="flex   flex-col  flex-wrap items-start ">
                      <div className="flex  justify-between  text-lg  text-black    ">
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          Per KG price:
                        </span>
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          {data?.startBiddingPrice + " $"}
                        </span>
                      </div>
                      <div className="flex  justify-between  text-lg  text-black    ">
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          Buy KG price:
                        </span>
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          {data?.buyNowPrice + " $"}
                        </span>
                      </div>
                      <div className="flex  justify-between  text-lg  text-black    ">
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          Minimum Bid Amount:
                        </span>
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          {data?.minimumBid + " $"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 mb-8 border dark:border-gray-700">
                    <div className="flex justify-start flex-col  items-start  text-xl text-left  ">
                      <div className=" text-left flex items-start flex-col lg:flex-row   text-black  my-2">
                        <h4 className="">This Auction Ends in : </h4>
                        <h2 className="ml-1 text-red-500">{remainingTime}</h2>
                      </div>

                      <div className="text-left text-sm text-black  font-semibold  my-2 flex ">
                        <h4 className="">Start Bidding Time :</h4>
                        <h2 className="ml-2">
                          {formatDateTime(data.startBiddingTime)}
                        </h2>
                      </div>

                      <div className="text-left my-2 flex text-sm text-black  font-semibold  ">
                        <h4 className="text-black ">End Bidding Time:</h4>
                        <h2 className="text-black ml-2">
                          {formatDateTime(data.endBiddingTime)}
                        </h2>
                      </div>

                      <div
                        className="flex items-center my-5     justify-center text-sm text-black  font-semibold
              "
                      >
                        <h1>Total Bids : </h1>
                        <h1 className="ml-2">
                          {data && data?.bids?.length
                            ? data?.bids?.length + "bids"
                            : "No Bids Available"}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  className="  my-2 text-center w-full  "
                  target="_blank"
                  href={data?.pdfFile}
                  download="product-description.xlsx"
                >
                  <button
                    type="button"
                    className="  px-5 py-3.5 rounded-md text-sm font-medium  text-black   w-full  border-[#719f18]  border   bg-transparent  "
                  >
                    Download Product
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="   my-6 ">
        <h2 className="text-left text-black  text-xl ">Shipping cost </h2>

        <div className="flex p-3  justify-between  flex-col  lg:flex-row   lg:border border-black  ">
          <div className="flex flex-col ">
            <div>
              <h1 className="text-xl text-left mt-4 text-black font-bold">
                Pangon Per kg price
              </h1>
            </div>
            <div className="w-full">
              <div className="form-control w-full max-w-xs">
                <label className="label text-black ">Container Price</label>
                <h3 className="text-xl text-black font-bold  text-left">
                  {data?.ShippingCost?.pangon?.containerPrice + "$"}
                </h3>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label text-black "> Bulk price</label>
                <h3 className="text-xl text-black font-bold  text-left">
                  {data?.ShippingCost?.pangon?.bulkPrice + "$"}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <div>
              <h1 className="text-xl text-left mt-4 text-black font-bold">
                Mongla Per kg price
              </h1>
            </div>
            <div className="w-full">
              <div className="form-control w-full max-w-xs">
                <label className="label text-black "> Container Price</label>
                <h3 className="text-xl text-black font-bold  text-left">
                  {data?.ShippingCost?.mongla?.containerPrice + "$"}
                </h3>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label text-black ">Bulk Price</label>
                <h3 className="text-xl text-black font-bold  text-left">
                  {data?.ShippingCost?.mongla?.bulkPrice + "$"}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <div>
              <h1 className="text-xl text-left mt-4 text-black font-bold">
                Chittagong Per kg price
              </h1>
            </div>
            <div className="w-full">
              <div className="form-control w-full max-w-xs">
                <label className="label text-black "> Container Price</label>
                <h3 className="text-xl text-black font-bold  text-left">
                  {data?.ShippingCost?.chattogram?.containerPrice + "$"}
                </h3>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label text-black ">Bulk Price</label>
                <h3 className="text-xl text-black font-bold  text-left">
                  {data?.ShippingCost?.chattogram?.bulkPrice + "$"}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <h1 className="text-xl mt-4 text-left text-black font-bold">
                Dhaka Per kg price
              </h1>
            </div>
            <div className="w-full">
              <div className="form-control w-full max-w-xs">
                <label className="label text-black ">Container Price</label>
                <h3 className="text-xl text-black font-bold  text-left">
                  {data?.ShippingCost?.dhaka?.containerPrice + "$"}
                </h3>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex justify-between  items-center   mt-20 flex-col  lg:flex-row">
          <div className="lg:w-[75%] w-full">
            <Koyel
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              koyel={data?.koyel}
            ></Koyel>
          </div>

          <div className="w-full p-2">
            <div className="w-full bg-white my-3">
              <div className="flex w-full  flex-col ">
                <label className="text-left text-lg text-black ">
                  Expected Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className="border bordered border-black w-full text-black bg-white  rounded  py-1"
                />
              </div>

              <div className="w-full  text-left ">
                <label
                  htmlFor="location"
                  className="text-left text-black text-lg "
                >
                  Select Shipping location
                </label>
                <select
                  required
                  className="w-full  border p-2 border-black text-black "
                  id="location"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <option disabled value="">
                    {" "}
                    select here{" "}
                  </option>
                  <option value="pangon">Pangon</option>
                  <option value="mongla">Mongla</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chattogram">Chattogram</option>
                </select>
                <br />
                <label
                  className="text-left text-black text-lg "
                  htmlFor="priceType"
                >
                  Select shipment type
                </label>
                <select
                  required
                  className="w-full  border p-2 border-black text-black "
                  id="priceType"
                  value={selectedPriceType}
                  onChange={handlePriceTypeChange}
                  disabled={selectedLocation === "dhaka"}
                >
                  {selectedLocation === "dhaka" ? (
                    <option value="container">Container</option>
                  ) : (
                    <>
                      <option value="" disabled>
                        select here{" "}
                      </option>
                      <option value="container">Container</option>
                      <option value="bulk">Bulk</option>
                    </>
                  )}
                </select>
                <br />
                {selectedLocation && (
                  <p className=" text-xl text-black ">
                    Shipping cost for {selectedLocation}
                  </p>
                )}
                {shippingCost && (
                  <p className=" text-xl text-black ">
                    Price: {shippingCost + "$"}
                  </p>
                )}
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
                  <div className="text-black text-left font-semibold">
                    Total item = {selectedItems.length}
                    <p>Total weight = {totals?.weight + "kg"}</p>
                    <p>
                      {" "}
                      Item price =
                      {itemCurrentPrice.toFixed(2) / selectedItems.length + "$"}
                      per kg
                    </p>
                    <p> Total Bidding Price : {totals?.biddingTotal + "$"}</p>
                  </div>
                ) : (
                  <div className="text-[red] capitalize text-md font-semibold">
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
                      min={totals?.biddingTotal}
                      value={newPrice}
                      onChange={handlePriceChange}
                      type="number"
                      step="any"
                      className="bg-gray-50 border border-black  text-black text-sm rounded-lg   block w-full pl-10 p-2.5  -gray-700     "
                      placeholder="$00:00"
                      required
                    />
                  </div>

                  {isLoading ? (
                    <ButtonSpiner data={"processing"}></ButtonSpiner>
                  ) : (
                    <button
                      className={`w-[60%] text-black border-black   items-center  py-2.5 px-3   text-sm font-medium   rounded-lg border  `}
                    >
                      Place Bid
                    </button>
                  )}
                </form>

                <p className="text-xl font-bold my-3 text-left">
                  {" "}
                  Total Buy Price : {totals?.buyingTotal + "$"}
                </p>

                <div className="flex  items-center lg:flex-row flex-col  justify-between ">
                  <div className="w-full">
                    <button
                      onClick={() => openModal()}
                      className="w-full   btn   text-sm bg-transparent hover:bg-transparent rounded-sm border text-black border-black  font-semibold"
                    >
                      Buy Now{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <BuyNow
            shipmentType={shipmentTypeValue}
            expectedDate={selectedDate}
            landing={landingValue}
            close={closeModal}
            id={data?._id}
            shippingCost={parseFloat(data?.ShippingCost)}
            data={selectedItems}
          ></BuyNow>
        )}
        <SingelProductActionHistory bids={data?.bids}>
          {" "}
        </SingelProductActionHistory>{" "}
      </div>
    </div>
  );
}
