import React, { useContext, useState } from "react";
import AWS from "aws-sdk";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

// Configure AWS SDK with your credentials and region

AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: "AKIA3VQV4Q3NDVIL2HTO",
  secretAccessKey: "LL5Y1TIK2/sWPm4Tn/bHO7izAikXVHSuQAGCaVxU",
});

const s3 = new AWS.S3();

const ExelTouploadProductUploadForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoadinding] = useState(false);
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [subImageUrls, setSubImageUrls] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startBiddingPrice, setStartBiddingPrice] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [startBiddingTime, setStartBiddingTime] = useState("");
  const [endBiddingTime, setEndBiddingTime] = useState("");
  const [ShippingCost, setShippingCost] = useState(null);
  const [category, setCategory] = useState('');



  const handleCountryChange = (event) => {
    setCategory(event.target.value);
  };

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



  const handleMainImageChange = e => {
    setMainImage(e.target.files[0]);
  };

  const handleSubImagesChange = e => {
    setSubImages([...e.target.files]);
  };

  const handleFileChange = e => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    setLoadinding(true);
    e.preventDefault();

    // Upload the main image
    let mainImageUrl = null;
    if (mainImage) {
      const mainImageKey = `path/to/main-image-${Date.now()}.png`;
      await uploadToS3(mainImage, mainImageKey);
      mainImageUrl = generateS3Url(mainImageKey);
    }

    // Upload the sub-images
    const subImageUrls = [];
    if (subImages.length > 0) {
      for (let i = 0; i < subImages.length; i++) {
        const subImage = subImages[i];
        const subImageKey = `path/to/sub-image-${i + 1}-${Date.now()}.png`;
        await uploadToS3(subImage, subImageKey);
        subImageUrls.push(generateS3Url(subImageKey));
      }
    }

    // Upload the PDF file
    let pdfUrl = null;
    if (pdfFile) {
      const pdfKey = `path/to/uploaded-file-${Date.now()}.xlsx`;
      await uploadToS3(pdfFile, pdfKey);
      pdfUrl = generateS3Url(pdfKey);
    }

    // Update state with the generated URLs
    setMainImageUrl(mainImageUrl);
    setSubImageUrls(subImageUrls);
    setPdfUrl(pdfUrl);

    ///save  product information db
    handleSaveProduct(mainImageUrl, subImageUrls, pdfUrl);

    // Reset form fields
    setMainImage(null);
    setSubImages([]);
    setPdfFile(null);
  };

  const uploadToS3 = (file, key) => {
    return new Promise((resolve, reject) => {
      s3.putObject(
        {
          Bucket: "kb-corporetion",
          Key: key,
          Body: file
        },
        (error, data) => {
          if (error) {
            setLoadinding(false);
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  };

  const generateS3Url = key => {
    return `https://kb-corporetion.s3.ap-southeast-1.amazonaws.com/${key}`;
  };

  ///exel file upload
  const [formData, setFormData] = useState(null);

  const handleExcelFileChange = event => {
    const file = event.target.files[0];
    convertExcelToJson(file);
  };

  const convertExcelToJson = file => {
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Delete the first row from the jsonData array
        jsonData.shift();

        const formattedData = formatData(jsonData);
        setFormData(formattedData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const formatData = jsonData => {
    if (jsonData) {
      const formattedKoyel = jsonData.map(row => ({
        _id: uuidv4(),
        endBiddingTime,
        item: row[0],
        spec: row[1],
        Thickness: row[2],
        Width: row[3],
        weight: row[4],
        TS: row[5],
        YP: row[6],
        EL: row[7],
        buyNowPrice,
        minimumBid: minimumBid,
        currentBid: minimumBid,
        bids: []
      }));

      return formattedKoyel;
    }
  };

  const handleSaveProduct = (mainImageUrl, subImageUrls, pdfUrl) => {
    const productInfo = {
      name,
      description,
      startBiddingPrice,
      minimumBid,
      startBiddingTime,
      endBiddingTime,
      mainImage: mainImageUrl,
      subImages: subImageUrls,
      pdfFile: pdfUrl,
      author: currentUser?.name,
      authorEmail: currentUser?.email,
      authorPhoto: currentUser?.userPhoto,
      koyel: formData,
      key: "koyel",
      bids: [],
      ShippingCost,
      category, 
      // winners: []
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/upload/koyel`, {
      method: "POST",
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
        navigate("/admin-dashboard/products/koyel-item");
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center">
          <div className="animate-bounce mr-2">
            <span className="font-bold text-3xl">Waitting</span>
          </div>
          <div className="bg-green-600 h-10 w-10 rounded-full animate-pulse"></div>
          <div className="animate-bounce ml-2">
            <span className="font-bold text-3xl">Upload</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-[#719f18] text-2xl  font-semibold my-5  capitalize text0-center">
        Upload from excel
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="name"
              name="name"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="name"
              className="peer-focus:font-medium absolute  text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Title
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              value={buyNowPrice}
              onChange={e => setBuyNowPrice(e.target.value)}
              name="buyNowPrice"
              id="buyNowPrice"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="buyNowPrice"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Per-Ton-Buy-Now-Price
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
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="minimumBid"
              className="peer-focus:font-medium absolute  text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Minimum Bid
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              value={startBiddingPrice}
              onChange={e => setStartBiddingPrice(e.target.value)}
              type="number"
              name="pertonPrice"
              id="pertonPrice"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              for="pertonPrice"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Per Ton price
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={startBiddingTime}
              onChange={handleStartbiddingTimeChange}
              type="datetime-local"
              id="startBiddingTime"
              name="startBiddingTime"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:bg-gray-400 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="startBiddingTime"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start-Bidding Time
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              value={endBiddingTime}
              onChange={handleEndbiddingTimeChange}
              type="datetime-local"
              id="endBiddingTime"
              name="endBiddingTime"
              className="block py-2.5 px-0 w-full text-sm  dark:bg-gray-400 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="endBiddingTime"
              className="peer-focus:font-medium absolute  text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="mainImage"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload Main Img
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              id="subImages"
              accept="image/*"
              multiple
              onChange={handleSubImagesChange}
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="subImg"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload Sub Img
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              id="pdfFile"
              onChange={handleFileChange}
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="pdfFile"
              className="peer-focus:font-medium absolute  text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload  downloaded file
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
          <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={category}
        onChange={handleCountryChange}
        required // Make the select element required
      >
        <option value="">Choose Category</option>
        <option value="CR">CR</option>
        <option value="GA">GA</option>
        <option value="PO">PO</option>
      </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              required
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExcelFileChange}
              placeholder="upload excel file"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="mainImage"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload Product form Excel 
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="shippingCost"
              id="shippingCost"
              value={ShippingCost}
              onChange={e => setShippingCost(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="name"
              className="peer-focus:font-medium absolute  text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              shipping cost
            </label>
          </div>
        </div>

        <label
          for="message"
          className="block mb-2 text-sm font-medium text-black dark:text-black"
        >
          About
        </label>
        <textarea
          id="message"
          rows="4"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   "
          placeholder="Leave a comment..."
        ></textarea>

        <button
          type="submit"
          className="text-white my-4 bg-[#719f18] hover:bg-[#73471b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default ExelTouploadProductUploadForm;
