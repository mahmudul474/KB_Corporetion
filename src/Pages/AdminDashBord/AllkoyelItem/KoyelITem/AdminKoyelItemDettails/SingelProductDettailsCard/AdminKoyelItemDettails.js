import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Koyel from "./Koyel/Koyel";
import SingelProductActionHistory from "./SingelProductActionHistory";

import SubImgSlider from "../../../../../../Shared/ProductDettailsCard/SubImgSlider";

export default function AdminKoyelItemDettails() {
  const data = useLoaderData();
  const [subimageUrl, setSubImgUrl] = useState(null);
  ////selected  item
  const [selectedItems, setSelectedItems] = useState([]);
  /// img   slider
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

  console.log(data);

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
            <Koyel
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              koyel={data?.koyel}
            ></Koyel>
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
                <span>Per Kg Price:</span>
                <span>{data?.startBiddingPrice} $</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-[#719f18]   ">
                <span>Buy per kg:</span>
                <span>{data?.buyNowPrice} $</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-[#719f18]   ">
                <span>minimum bid:</span>
                <span>{data?.minimumBid} $</span>
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
              <div className="flex  items-center lg:flex-row flex-col  justify-between ">
                <a
                  className=" mx-3 my-2 text-center w-full  "
                  target="_blank"
                  href={data?.pdfFile}
                  download="product-description"
                >
                  <button
                    type="button"
                    className="  px-5 py-3.5 rounded-md text-sm font-medium   w-full text-white bg-[#719f18] hover:bg-[#73471b]  "
                  >
                    Download PDF
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                chattogram Per kg price
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
      <SingelProductActionHistory bids={data?.bids}>
        {" "}
      </SingelProductActionHistory>{" "}
    </div>
  );
}
