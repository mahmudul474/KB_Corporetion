import React, { useState } from "react";

import { toast } from "react-hot-toast";

const EditProductPopUp = ({ data, onClose, refetch }) => {
  const [loading, setLoadinding] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startBiddingPrice, setStartBiddingPrice] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [startBiddingTime, setStartBiddingTime] = useState("");
  const [endBiddingTime, setEndBiddingTime] = useState("");


  const handleEndbiddingTimeChange = e => {
    setEndBiddingTime(e.target.value);

    // Close the date and time picker
    e.target.blur();
  };
  const handleStartbiddingTimeChange = e => {
    setStartBiddingTime(e.target.value);

    // Close the date and time picker
    e.target.blur();
  };

  const handleUpadeteProduct = e => {
    e.preventDefault();
    const productInfo = {
      name: name ? name : data.name,
      description: description ? description : data.description,
      startBiddingPrice: startBiddingPrice
        ? startBiddingPrice
        : data?.startBiddingPrice,
      buyNowPrice: buyNowPrice ? buyNowPrice : data?.buyNowPrice,
      minimumBid: minimumBid ? minimumBid : data?.minimumBid,
      startBiddingTime: startBiddingTime
        ? startBiddingTime
        : data?.startBiddingTime,
      endBiddingTime: endBiddingTime ? endBiddingTime : data?.endBiddingTime
    };

    fetch(`${process.env.REACT_APP_API_URL}/product/update/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productInfo)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        setLoadinding(false);
        toast.success(data.message);
        onClose();
        refetch();
      })
      .catch(error => {
        console.error(error);
      });
  };

  ///loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center">
          <div className="animate-bounce mr-2">
            <span className="font-bold text-3xl">Waitting</span>
          </div>
          <div className="bg-green-600 h-10 w-10 rounded-full animate-pulse"></div>
          <div className="animate-bounce ml-2">
            <span className="font-bold text-3xl">Update</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center ">
      <div className="shadow-2xl bg-white rounded-lg p-8">
        <h2 className="mb-5 text-xl text-green-700">Edit Product</h2>
        <form onSubmit={handleUpadeteProduct}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="name"
                name="name"
                id="name"
                defaultValue={data?.name}
                onBlur={e => setName(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="name"
                className="peer-focus:font-medium absolute  text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                defaultValue={data?.buyNowPrice}
                onBlur={e => setBuyNowPrice(e.target.value)}
                name="buyNowPrice"
                id="buyNowPrice"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="buyNowPrice"
                className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Buy-Now-Price
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="minimumBid"
                id="minimumBid"
                defaultValue={data?.minimumBid}
                onBlur={e => setMinimumBid(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="minimumBid"
                className="peer-focus:font-medium absolute  text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Minimum Bid
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={data?.startBiddingPrice}
                onBlur={e => setStartBiddingPrice(e.target.value)}
                type="number"
                name="startBiddingPrice"
                id="startBiddingPrice"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none     dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="startBiddingPrice"
                className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Start-Bidding Price
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={data?.startBiddingTime}
                onChange={handleStartbiddingTimeChange}
                type="datetime-local"
                id="startBiddingTime"
                name="startBiddingTime"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="startBiddingTime"
                className="peer-focus:font-medium absolute text-sm text-black   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Start-Bidding Time
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={data?.endBiddingTime}
                onChange={handleEndbiddingTimeChange}
                type="datetime-local"
                id="endBiddingTime"
                name="endBiddingTime"
                className="block py-2.5 px-0 w-full text-sm text-   border-0 border-b-2 border-gray-300 appearance-none     focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="endBiddingTime"
                className="peer-focus:font-medium absolute  text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                End-Bidding-Time
              </label>
            </div>
          </div>

          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900  "
          >
            About
          </label>
          <textarea
            id="message"
            rows="4"
            defaultValue={data?.description}
            onBlur={e => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Leave a comment..."
          ></textarea>

          <button
            type="submit"
            className="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="btn   border-none bg-green-700 p-2 text-white font-semibold rounded-md ml-3"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPopUp;
