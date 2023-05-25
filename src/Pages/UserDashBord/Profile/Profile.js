import React from "react";

export default function Profile() {
  return (
    <div className="px-5  ">
      <div className="shadow-gray-400 p-10 shadow-2xl ">
        <h1 className="text-4xl capitalize  text-left mb-3 font-bold">Personal Details</h1>
        <div className="text-lg  font-semibold capitalize">
          <h1 className="flex justify-start my-2">
            <span className="mr-5 ">Name:</span>
            <span>sobuj hasan </span>
          </h1>
          <h1 className="flex justify-start my-2">
            <span className="mr-5">Email:</span>
            <span>example@gmail.com </span>
          </h1>
          <h1 className="flex justify-start my-2">
            <span className="mr-5">Phone:</span>
            <span>01906479710 </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
