import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";
import DatePicker from "react-datepicker";
import Koyel from "./Koyel/Koyel";
import SingelProductActionHistory from "./SingelProductActionHistory";
import BuyNow from "./BuyNowKoyelItem/BuyNow";
import SubImgSlider from "../SubImgSlider";
import 'react-datepicker/dist/react-datepicker.css';

export default function SingelProductsDettails() {
  const { currentUser, user } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [landingValue, setLandingValue] = useState(''); // State for landing select
  const [shipmentTypeValue, setShipmentTypeValue] = useState('');
 

  


  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [subimageUrl, setSubImgUrl] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [bidEroo, setBidError] = useState("");

  const handlePriceChange = (event) => {
    setBidError("");
    const bidPrice = parseFloat(event.target.value);
    setNewPrice(bidPrice);
  };

  ////selected  item
  const [selectedItems, setSelectedItems] = useState([]);
  const items = selectedItems?.map((skoyel) => {
    return skoyel.bids && skoyel.bids.length === 0
      ? skoyel?.currentBid
      : skoyel.bids[skoyel.bids.length - 1].bidAmount;
  });
  const itemCurrentPrice = items.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue),
    0
  );
  /// img    slider
  const handleSubimgShow = (subimgUrl) => {
    setSubImgUrl(subimgUrl);
  };

  ///  remmenint time
  const calculateRemainingTime = (endTime) => {
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

  const isBiddingStartSoon = (startTime) => {
    const currentTime = new Date().getTime();
    const startTimeValue = new Date(startTime).getTime();

    return currentTime < startTimeValue;
  };

  const isBiddingEnd = (endTime) => {
    const currentTime = new Date().getTime();
    const endTimeValue = new Date(endTime).getTime();

    return currentTime > endTimeValue;
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
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
        .then((res) => res.json())
        .then((data) => {});
    }
  }, [data._id]);

  ///place bid
  const handlePlcebid = (e) => {
    e.preventDefault();

    if (!currentUser || !user) {
      return navigate("/login");
    } else if (user?.emailVerified === "false") {
      return alert("Please  check your email and noreply! and verify email");
    } else if (currentUser?.role !== "bidder") {
      return alert("please waiting for admin approval");
    } else if (selectedItems.length === 0) {
      return alert("Please select items"), setBidError("Please select items");
    }else if (selectedDate===""){
      return alert("Please select  date")
    }else if(landingValue===""){
      return alert("Please select landing ")
    }else if(shipmentTypeValue===""){
return alert("Please select shipment type")
    }

    // Prepare the bid data for selected items
    const koyelBids = selectedItems.map((item) => ({
      koyelId: item._id,
      koyel: item,
      bidAmount: newPrice / selectedItems?.length,
      bidderName: currentUser?.name,
      bidderEmail: currentUser?.email,
      bidderId: currentUser?._id,
      bidderPhoto: currentUser?.userPhoto,
      bidderNumber: currentUser?.phoneNumber,
      expectedDate:selectedDate,
       landing: landingValue,
       shipmentType:shipmentTypeValue
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
      bidderNumber: currentUser?.phoneNumber,
      
      
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/${data._id}/koyel/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ koyelBids, bidder }),
    })
      .then((response) => response.json())
      .then((data) => {
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
    }else  if (selectedDate===""){
      return alert("Please select  date")
    }else if(landingValue===""){
      return alert("Please select landing ")
    }else if(shipmentTypeValue===""){
return alert("Please select shipment type")
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


 console.log(data)



  return (
    <div className="  px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
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
                          className="btn bg-[#719f18]   hover:bg-[#73471b]"
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
                      className={`inline-flex lg:w-1/3 w-1/2 items-center mr-4 py-2.5 px-3 lg:px-8 ml-2 text-sm font-medium  bg-[#719f18] rounded-lg border  `}
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
                        className="  px-5 py-3.5 rounded-md text-sm font-medium   w-full  bg-[#719f18] hover:bg-[#73471b]  "
                      >
                        Download Product
                      </button>
                    </a>

                    <div className="w-full">
                      <button
                        onClick={() => openModal()}
                        className="w-full   btn bg-[#719f18] hover:bg-[#73471b]  font-semibold"
                      >
                        Buy Now{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
                    <h2 className="  mt-1 mb-6 text-2xl font-bold text-black  text-left md:text-4xl">
                      {data.name}
                    </h2>
                    <h2 className="     text-md font-bold text-black  text-left">
                      Type : {data?.category}
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

                  <div className="p-4 mb-8 border border-gray-300 dark:border-gray-700">
                    <div className="flex   flex-col  flex-wrap items-start ">
                      <div className="flex  justify-between  text-lg  text-black    ">
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          Per Ton price:
                        </span>
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          {data?.startBiddingPrice} $
                        </span>
                      </div>
                      <div className="flex  justify-between items-center   text-lg  text-black    ">
                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          Current bidding Price:
                        </span>

                        <span className=" text-sm text-black  font-semibold  dark:text-black">
                          {data.bids &&
                            data.bids.length > 0 &&
                            data.bids[data.bids.length - 1].amount + "$"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 mb-8 border border-gray-300 dark:border-gray-700">
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
              <div className="flex items-center ">
                <label className="mr-2 text-black">Expected Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className="border text-black bg-white border-gray-300  rounded px-2 py-1"
                />
              </div>

              <div>
                <div className="my-4">
                  <select
                    className="select select-bordered bg-white text-black w-full max-w-xs"
                    value={landingValue}
                    onChange={e => setLandingValue(e.target.value)}
                  >
                    <option disabled value="">
                      Landing
                    </option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Pangaon">Pangaon</option>
                  </select>
                </div>
                <div className="my-4">
                  <select
                    className="select select-bordered bg-white text-black w-full max-w-xs"
                    value={shipmentTypeValue}
                    onChange={e => setShipmentTypeValue(e.target.value)}
                  >
                    <option disabled value="">
                      Shipment Type
                    </option>
                    <option value="Container">Container</option>
                    <option value="Bulk">Bulk</option>
                  </select>
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
                  <div className="text-black text-left font-semibold">
                    Total item = {selectedItems.length}
                    <p> Item price ={itemCurrentPrice.toFixed(2) + "$"}</p>
                    <p> Shipping = {data?.ShippingCost + "$"}</p>
                    <p>
                      {" "}
                      Total ={" "}
                      {itemCurrentPrice + parseFloat(data?.ShippingCost) + "$"}
                    </p>
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
                      min={itemCurrentPrice + parseFloat(data?.ShippingCost)}
                      value={newPrice}
                      onChange={handlePriceChange}
                      type="number"
                      step="any"
                      className="bg-gray-50 border border-black  text-black text-sm rounded-lg   block w-full pl-10 p-2.5  -gray-700     "
                      placeholder="$00:00"
                      required
                    />
                  </div>

                  <button
                    className={`w-[60%] text-black border-black   items-center  py-2.5 px-3   text-sm font-medium   rounded-lg border  `}
                  >
                    Place Bid
                  </button>
                </form>

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
