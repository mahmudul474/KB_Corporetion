import React, { useContext, useState } from "react";
 
import AWS from "aws-sdk";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-hot-toast";

AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: "AKIA3VQV4Q3NDVIL2HTO",
  secretAccessKey: "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"
});

const ActiveBidder = ({ onClose, userInfo, refetch }) => {
  const [number, setNumber] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const [businessAddress, setBusinessAddress] = useState(null);
  const [tinNum, setTinNum] = useState(null);
  const [tradelicense, setTradeLicense] = useState(null);

  const [nidImageUrl, setNidImageUrl] = useState(null);
  const handleNidImgupload = event => {
    const file = event.target.files[0];
    const s3 = new AWS.S3();

    const params = {
      Bucket: "kb-corporetion",
      Key: file.name,
      Body: file
      // Set the appropriate ACL based on your requirements
    };

    s3.upload(params, (error, data) => {
      if (error) {
        console.error("Error:", error);
      } else {
        setNidImageUrl(data.Location);
        console.log("Profile image uploaded successfully:", data.Location);
        // Do something with the uploaded profile image URL
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const bidderinfo = {
      phoneNumber: number ? number : userInfo?.phoneNumber,
      businessName: businessName ? businessName : userInfo?.businessName,
      businessAddress: businessAddress
        ? businessAddress
        : userInfo?.businessAddress,
      tinNum: tinNum ? tinNum : userInfo?.tinNum,
      tradeLN: tradelicense ? tradelicense : userInfo?.tradeLN
    };

    console.log(bidderinfo);

    fetch(`${process.env.REACT_APP_API_URL}/user/bidder/${userInfo?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify(bidderinfo)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        refetch();
        onClose();
      })
      .catch(err => toast.error(err.message));
  };

  const handleCancel = () => {
    // Close the popup without submitting the form
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-slate-400 rounded-lg p-8 w-3/5 overflow-auto h-[600px]">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <img
              src={userInfo?.userPhoto}
              alt="Profile Photo"
              className="rounded-full m-auto  w-32 h-32"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="input" className="block  text-left mb-2">
              Name
            </label>
            <input
              id="input"
              type="text"
              disabled
              value={userInfo?.name}
              className="border border-gray-300 p-2 w-full"
            />

            <div className="flex lg:flex-row flex-col ">
              <div className="w-full">
                <label htmlFor="input" className="block  text-left mb-2">
                  Email
                </label>
                <input
                  id="input"
                  type="text"
                  disabled
                  value={userInfo?.email}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="w-full">
                <label htmlFor="input" className="block mb-2 text-left ">
                  Number
                </label>
                <input
                  id="input"
                  onChange={e => setNumber(e.target.value)}
                  type="number "
                  defaultValue={userInfo?.phoneNumber}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>

            <div className="flex lg:flex-row flex-col">
              <div className="w-full">
                <label htmlFor="input" className="block  text-left mb-2">
                  Business-Name
                </label>
                <input
                  onChange={e => setBusinessName(e.target.value)}
                  id="input"
                  type="text"
                  defaultValue={userInfo?.businessName}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="w-full">
                {" "}
                <label htmlFor="input" className="block  text-left mb-2">
                  Business-Address
                </label>
                <input
                  onChange={e => setBusinessAddress(e.target.value)}
                  id="input"
                  type="text"
                  defaultValue={userInfo?.businessAddress}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>

            <div className="flex lg:flex-row flex-col">
              <div className="w-full">
                {" "}
                <label htmlFor="input" className="block  text-left mb-2">
                  Tin-Number
                </label>
                <input
                  onChange={e => setTinNum(e.target.value)}
                  id="input"
                  type="text"
                  defaultValue={userInfo?.tinNum}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="w-full">
                {" "}
                <label htmlFor="input" className="block  text-left mb-2">
                  Trade-License
                </label>
                <input
                  id="input"
                  onChange={e => setTradeLicense(e.target.value)}
                  type="text"
                  defaultValue={userInfo?.tradeLN}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>

            {nidImageUrl ? (
              <div className="my-5 relative">
                <label
                  htmlFor="fileInput"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
                >
                  <FiEdit size={24} />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleNidImgupload}
                  className="hidden"
                />
                <img className="w-full  h-full" src={nidImageUrl} />
              </div>
            ) : (
              <div className="my-5 relative">
                <label
                  htmlFor="fileInput"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
                >
                  <FiEdit size={24} />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleNidImgupload}
                  className="hidden"
                />
                <img className="w-full  h-full" src={userInfo?.nidCardImg} />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 mr-2 text-white py-2 px-4 rounded"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActiveBidder;
