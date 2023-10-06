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
  const [category, setCategory] = useState("");
  const [shoppingCost, setShoppingCost] = useState({
    pangon: {
      containerPrice: null,
      bulkPrice: null
    },
    mongla: {
      containerPrice: null,
      bulkPrice: null
    },
    chattogram: {
      containerPrice: null,
      bulkPrice: null
    },
    dhaka: {
      containerPrice: null
    }
  });

  

  // Event handler to update the state when input values change
  const handleInputChange = (event, location, field) => {
    const { value } = event.target;
    setShoppingCost(prevShoppingCost => ({
      ...prevShoppingCost,
      [location]: {
        ...prevShoppingCost[location],
        [field]: parseFloat(value) || 0 // Convert input value to a number
      }
    }));
  };

  const handleCountryChange = event => {
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
        currentBid: startBiddingPrice,
        startBiddingPrice: startBiddingPrice,
        bids: []
      }));

      return formattedKoyel;
    }
  };

  const handleSaveProduct = (mainImageUrl, subImageUrls, pdfUrl) => {
    if (category === "") {
      return alert("Please select a category");
    }

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
      winners: [],
      buyNowPrice,
      ShippingCost: shoppingCost,
      category,
      emailsSent: false
      // winners: []
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/items/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productInfo)
    })
      .then(res => res.json())
      .then(data => {
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
            <span className="font-bold text-3xl">Waiting</span>
          </div>
          <div className="bg-green-600 h-10 w-10 rounded-full animate-pulse"></div>
          <div className="animate-bounce ml-2">
            <span className="font-bold text-3xl">for Upload</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className=" my-10 text-black text-2xl   font-semibold  capitalize text0-center">
        Upload Item Product
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 dark:border-black appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="name"
              className="peer-focus:font-medium absolute  text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 dark:border-black appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="buyNowPrice"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Per Kg Buy Price
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
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 dark:border-black appearance-none dark:text-black dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 dark:border-black appearance-none dark:text-black dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              for="pertonPrice"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Per Kg Price
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 my-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={startBiddingTime}
              onChange={handleStartbiddingTimeChange}
              type="datetime-local"
              id="startBiddingTime"
              name="startBiddingTime"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 dark:border-black appearance-none  dark:bg-gray-400 dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="startBiddingTime"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
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
              className="block py-2.5 px-0 w-full text-sm  dark:bg-gray-400 text-gray-900 bg-transparent border-0 border-b-2 dark:border-black appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="endBiddingTime"
              className="peer-focus:font-medium absolute  text-sm text-black dark:text-black duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
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
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 dark:border-black appearance-none dark:text-black   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="mainImage"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload Thumbnails
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              id="subImages"
              accept="image/*"
              multiple
              onChange={handleSubImagesChange}
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 dark:border-black appearance-none dark:text-black   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="subImg"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload Images
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              id="pdfFile"
              onChange={handleFileChange}
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 dark:border-black appearance-none dark:text-black   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="pdfFile"
              className="peer-focus:font-medium absolute  text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload downloaded file
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="countries"
              className="bg-gray-50 border   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={category}
              onChange={handleCountryChange}
              required
            >
              <option>Choose Category</option>
              <option value="CR">CR</option>
              <option value="GI/GA">GI/GA</option>
              <option value="PO/HR">PO/HR</option>
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
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2   appearance-none dark:text-black dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="mainImage"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              upload Product File
            </label>
          </div>
        </div>

        <label
          for="message"
          className="block mb-2 text-sm font-medium text-black dark:text-black"
        >
          Description
        </label>
        <textarea
          id="message"
          rows="4"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border dark:border-black focus:ring-blue-500 focus:border-blue-500   "
          placeholder="About Product description "
        ></textarea>

        <div className="   my-6 ">
          <h2 className="text-left text-black  text-xl ">Shipping cost </h2>

          <div className="flex   justify-between  flex-col  lg:flex-row  lg:p-10 lg:border border-black  ">
            <div className="flex flex-col ">
              <div>
                <h1 className="text-xl text-left mt-4 text-black font-bold">
                  Pangon Per kg price
                </h1>
              </div>
              <div className="w-full">
                <div className="form-control w-full max-w-xs">
                  <label className="label text-black ">Container Price</label>
                  <input
                    value={shoppingCost.pangon.containerPrice}
                    onChange={e =>
                      handleInputChange(e, "pangon", "containerPrice")
                    }
                    required
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-full text-black  bg-white "
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label text-black "> Bulk price</label>
                  <input
                    type="number"
                    required
                    value={shoppingCost.pangon.bulkPrice}
                    onChange={e => handleInputChange(e, "pangon", "bulkPrice")}
                    placeholder="Type here"
                    className="input input-bordered w-full text-black  bg-white "
                  />
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
                  <input
                    value={shoppingCost.mongla.containerPrice}
                    onChange={e =>
                      handleInputChange(e, "mongla", "containerPrice")
                    }
                    type="number"
                    required
                    placeholder="Type here"
                    className="input input-bordered w-full text-black  bg-white "
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label text-black ">Bulk Price</label>
                  <input
                    value={shoppingCost.mongla.bulkPrice}
                    onChange={e => handleInputChange(e, "mongla", "bulkPrice")}
                    type="number"
                    required
                    placeholder="Type here"
                    className="input input-bordered w-full text-black  bg-white "
                  />
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
                  <input
                    value={shoppingCost.chattogram.containerPrice}
                    onChange={e =>
                      handleInputChange(e, "chattogram", "containerPrice")
                    }
                    type="number"
                    required
                    placeholder="Type here"
                    className="input input-bordered w-full text-black  bg-white "
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label text-black ">Bulk Price</label>
                  <input
                    value={shoppingCost.chattogram.bulkPrice}
                    onChange={e =>
                      handleInputChange(e, "chattogram", "bulkPrice")
                    }
                    type="number"
                    required
                    placeholder="Type here"
                    className="input input-bordered w-full text-black  bg-white "
                  />
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
                  <input
                    value={shoppingCost.dhaka.containerPrice}
                    onChange={e =>
                      handleInputChange(e, "dhaka", "containerPrice")
                    }
                    required
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-full text-black  bg-white "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

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
