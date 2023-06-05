import React, { useContext, useState } from "react";

import { FiEdit } from "react-icons/fi";
import AWS from "aws-sdk";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: "AKIA3VQV4Q3NDVIL2HTO",
  secretAccessKey: "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"
});

const ActiveBidder = ({ onClose }) => {
  const { currentUser } = useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const handleProfileImageUpload = event => {
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
        setProfileImageUrl(data.Location);
        console.log("Profile image uploaded successfully:", data.Location);
        // Do something with the uploaded profile image URL
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const userinfo = {
      userPhoto: profileImageUrl ? profileImageUrl : currentUser?.userPhoto,
      name: name ? name : currentUser?.name,
      phoneNumber: phoneNumber ? phoneNumber : currentUser?.phoneNumber
    };

    if (currentUser?.email) {
      fetch(`${process.env.REACT_APP_API_URL}/user/${currentUser?.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userinfo)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          toast.success("successfully updated");
          window.location.reload(true);
          onClose();
        })
        .catch(er => {
          toast.error(er.message);
        });
    }
  };

  const handleCancel = () => {
    // Close the popup without submitting the form
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-slate-400 rounded-lg p-8 w-96">
        <h2 className="text-2xl mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {profileImageUrl ? (
            <div className="relative">
              <img
                src={profileImageUrl}
                alt="Profile Photo"
                className="rounded-full m-auto  w-32 h-32"
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-1/4 bg-white rounded-full p-2 cursor-pointer"
              >
                <FiEdit size={24} />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={currentUser?.userPhoto}
                alt="Profile Photo"
                className="rounded-full m-auto  w-32 h-32"
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-1/4 bg-white rounded-full p-2 cursor-pointer"
              >
                <FiEdit size={24} />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="input" className="block  text-left mb-2">
              Change Name
            </label>
            <input
              id="input"
              type="text"
              defaultValue={currentUser?.name}
              onChange={e => setName(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />

            <label htmlFor="input" className="block mb-2 text-left ">
              Change Phone-Number
            </label>
            <input
              id="input"
              type="number "
              defaultValue={currentUser?.phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 mr-2 text-white py-2 px-4 rounded"
            >
              Submit
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
