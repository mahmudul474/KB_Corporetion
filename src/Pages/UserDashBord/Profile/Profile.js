import React, { useContext } from "react";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="px-5  ">
      <div className="shadow-gray-400 mt-24 p-10 shadow-2xl ">
        <h1 className="text-4xl capitalize  text-left mb-3 font-semibold">
          Personal Details
        </h1>
        <span className="w-20 h-[2px] bg-green-600 block mb-10"></span>
        <div className="text-lg  font-semibold capitalize">
          <h1 className="flex justify-start my-2">
            <span className="mr-5 ">Name:</span>
            <span> {currentUser?.name}</span>
          </h1>
          <h1 className="flex justify-start my-2">
            <span className="mr-5">Email:</span>
            <span>{currentUser?.email} </span>
          </h1>
          <h1 className="flex justify-start my-2">
            <span className="mr-5">Phone:</span>
            <span>{currentUser?.phoneNumber} </span>
          </h1>
        </div>
      </div>
      <div className=" mt-10 shadow-gray-400 p-10 shadow-2xl ">
        <h1 className="text-4xl capitalize  text-left mb-3 font-semibold">
          security
        </h1>
        <span className="w-20 h-[2px] bg-green-600 block mb-10"></span>
        <div className="text-lg  font-semibold capitalize">
          <h1 className="flex justify-start my-2">
            <span className="mr-5 ">Business-Name:</span>
            <span> {currentUser?.businessName}</span>
          </h1>
          <h1 className="flex justify-start my-2">
            <span className="mr-5">Business-Address</span>
            <span>{currentUser?.businessAddress} </span>
          </h1>
          <h1 className="flex justify-start my-2">
            <span className="mr-5">Tin Number:</span>
            <span>{currentUser?.tinNum} </span>
          </h1>
          <h1 className="flex justify-start my-2">
            <span className="mr-5">Trade License no:</span>
            <span>{currentUser?.tradeLN} </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
