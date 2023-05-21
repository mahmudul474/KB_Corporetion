import React, { useState } from "react";
import axios from "axios";

const ProductUploadForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subImages, setSubImages] = useState([]);
  const [startBiddingPrice, setStartBiddingPrice] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [startBiddingTime, setStartBiddingTime] = useState("");
  const [endBiddingTime, setEndBiddingTime] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = e => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("startBiddingPrice", startBiddingPrice);
    formData.append("buyNowPrice", buyNowPrice);
    formData.append("minimumBid", minimumBid);
    formData.append("startBiddingTime", startBiddingTime);
    formData.append("endBiddingTime", endBiddingTime);
    formData.append("pdfFile", pdfFile);

    for (let i = 0; i < subImages.length; i++) {
      formData.append("subImages", subImages[i]);
    }

    try {
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data); // Assuming the server returns the created product object
      // Clear form fields or show success message
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="name"
            name="name"
            id="name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="name"
            class="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Product Name
          </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="buyNowPrice"
            id="buyNowPrice"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="buyNowPrice"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Buy-Now-Price
          </label>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="minimumBid"
            id="minimumBid"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="minimumBid"
            class="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Minimum Bid
          </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="startBiddingPrice"
            id="startBiddingPrice"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="startBiddingPrice"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Start-Bidding Price
          </label>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="datetime-local"
            id="startBiddingTime"
            name="startBiddingTime"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="startBiddingTime"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Start-Bidding Time
          </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <input
            type="datetime-local"
            id="endBiddingTime"
            name="endBiddingTime"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="endBiddingTime"
            class="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            End-Bidding-Time
          </label>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="datetime-local"
            id="startBiddingTime"
            name="startBiddingTime"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="startBiddingTime"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Start-Bidding Time
          </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="pdfFile"
            class="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Upload Pdf
          </label>
        </div>
      </div>

      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {" "}
          Sub Img
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              class="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>

      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        About
      </label>
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Leave a comment..."
      ></textarea>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>

    // <form onSubmit={handleSubmit}>
    //   <label htmlFor="name">Product Name:</label>
    //   <input
    //     type="text"
    //     id="name"
    //     value={name}
    //     onChange={e => setName(e.target.value)}
    //     required
    //   />

    //   <label htmlFor="description">Description:</label>
    //   <textarea
    //     id="description"
    //     value={description}
    //     onChange={e => setDescription(e.target.value)}
    //     required
    //   ></textarea>

    //   <label htmlFor="subImages">Sub-Images:</label>
    //   <input
    //     type="file"
    //     id="subImages"
    //     onChange={e => setSubImages(e.target.files)}
    //     multiple
    //     required
    //   />

    //   <label htmlFor="startBiddingPrice">Start Bidding Price:</label>
    //   <input
    //     type="number"
    //     id="startBiddingPrice"
    //     value={startBiddingPrice}
    //     onChange={e => setStartBiddingPrice(e.target.value)}
    //     required
    //   />

    //   <label htmlFor="buyNowPrice">Buy Now Price:</label>
    //   <input
    //     type="number"
    //     id="buyNowPrice"
    //     value={buyNowPrice}
    //     onChange={e => setBuyNowPrice(e.target.value)}
    //     required
    //   />

    //   <label htmlFor="minimumBid">Minimum Bid:</label>
    //   <input
    //     type="number"
    //     id="minimumBid"
    //     value={minimumBid}
    //     onChange={e => setMinimumBid(e.target.value)}
    //     required
    //   />

    //   <label htmlFor="startBiddingTime">Start Bidding Time:</label>
    //   <input
    //     type="datetime-local"
    //     id="startBiddingTime"
    //     value={startBiddingTime}
    //     onChange={e => setStartBiddingTime(e.target.value)}
    //     required
    //   />

    //   <label htmlFor="endBiddingTime">End Bidding Time:</label>
    //   <input
    //     type="datetime-local"
    //     id="endBiddingTime"
    //     value={endBiddingTime}
    //     onChange={e => setEndBiddingTime(e.target.value)}
    //     required
    //   />

    //   <label htmlFor="pdfFile">PDF File:</label>
    //   <input type="file" id="pdfFile" onChange={handleFileChange} required />

    //   <button type="submit">Upload Product</button>
    // </form>
  );
};

export default ProductUploadForm;
