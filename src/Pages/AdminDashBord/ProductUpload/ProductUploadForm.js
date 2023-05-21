import React, { useState } from "react";
import axios from "axios";

const ProductUploadForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startBiddingPrice, setStartBiddingPrice] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [startBiddingTime, setStartBiddingTime] = useState("");
  const [endBiddingTime, setEndBiddingTime] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const handleMainImageChange = e => {
    setMainImage(e.target.files[0]);
  };

  const handleFileChange = e => {
    setPdfFile(e.target.files[0]);
  };
  const handleSubImagesChange = e => {
    setSubImages(e.target.files);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("startBiddingPrice", startBiddingPrice);
    formData.append("buyNowPrice", buyNowPrice);
    formData.append("minimumBid", minimumBid);
    formData.append("startBiddingTime", startBiddingTime);
    formData.append("endBiddingTime", endBiddingTime);
    formData.append("mainImage", mainImage);
    formData.append("pdfFile", pdfFile);
    for (let i = 0; i < subImages.length; i++) {
      formData.append("subImages", subImages[i]);
    }

    // // Send the form data to the server for processing

    fetch("http://localhost:5000/products", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log("Product uploaded successfully", data);
        // Clear the form fields after successful upload
        setName("");
        setDescription("");
        setStartBiddingPrice("");
        setBuyNowPrice("");
        setMinimumBid("");
        setStartBiddingTime("");
        setEndBiddingTime("");
        setMainImage(null);
        setSubImages([]);
      })
      .catch(error => {
        console.error("Error uploading product", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="name"
            className="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Product Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            value={buyNowPrice}
            onChange={e => setBuyNowPrice(e.target.value)}
            name="buyNowPrice"
            id="buyNowPrice"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="buyNowPrice"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            value={minimumBid}
            onChange={e => setMinimumBid(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="minimumBid"
            className="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Minimum Bid
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={startBiddingPrice}
            onChange={e => setStartBiddingPrice(e.target.value)}
            type="number"
            name="startBiddingPrice"
            id="startBiddingPrice"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="startBiddingPrice"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Start-Bidding Price
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={startBiddingTime}
            onChange={e => setStartBiddingTime(e.target.value)}
            type="datetime-local"
            id="startBiddingTime"
            name="startBiddingTime"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="startBiddingTime"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Start-Bidding Time
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={endBiddingTime}
            onChange={e => setEndBiddingTime(e.target.value)}
            type="datetime-local"
            id="endBiddingTime"
            name="endBiddingTime"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="endBiddingTime"
            className="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            End-Bidding-Time
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="file"
            id="mainImage"
            accept="image/*"
            onChange={handleMainImageChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="mainImage"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Upload Main Img
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="file"
            id="pdfFile"
            onChange={handleFileChange}
            name="pdfFile"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="pdfFile"
            className="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Upload Pdf
          </label>
        </div>
      </div>

      <input
        type="file"
        id="subImages"
        accept="image/*"
        multiple
        onChange={handleSubImagesChange}
      />

      <label
        for="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        About
      </label>
      <textarea
        id="message"
        rows="4"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Leave a comment..."
      ></textarea>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductUploadForm;
