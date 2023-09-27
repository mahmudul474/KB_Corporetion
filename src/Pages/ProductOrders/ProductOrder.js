import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";

AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: "AKIA3VQV4Q3NDVIL2HTO",
  secretAccessKey: "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"
});

export default function ProductOrder() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const data = useLoaderData();
  const [bankSleep, setBanSleep] = useState(null);
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [branch, setBranch] = useState("");
  const [bank, setBankname] = useState("");

  const handleBankSleepuplod = event => {
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
        setBanSleep(data.Location);
        console.log("NID photo uploaded successfully:", data.Location);
        // Do something with the uploaded NID photo URL
      }
    });
  };

  const handlSubmitOrder = e => {
    e.preventDefault();

    const order = {
      transaction,
      bankSleep,
      amount,
      branch,
      bank,
      bidderName: currentUser?.name,
      bidderId: currentUser?._id,
      bidderEmail: currentUser?.email,
      bidderNumber: currentUser?.phoneNumber,
      bidderPhoto: currentUser?.userPhoto,
      productId: data?._id,
      productName: data?.name,
      productImg: data?.mainImage,
      buyNowPrice: data?.buyNowPrice,
      status: "pending",
      order: "order"
    };

    fetch(`${process.env.REACT_APP_API_URL}/payments/details/${data?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
      
       
          navigate("/my-dashboard/buy");
       
      });
  };

  return (
    <>
   
        <div className="  bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img
                  src={data?.mainImage}
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {data?.name}
                    </h2>
                    <p className="mt-1 text-xs text-black">
                      {data?.description.slice(0, 120)}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4">
                      <p className="text-md  font-semibold">
                        Price: {data?.buyNowPrice + "$"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-black">Subtotal</p>
                <p className="text-black">{data?.buyNowPrice + "$"}</p>
              </div>

              <form onSubmit={handlSubmitOrder} className="max-w-md mx-auto">
                <div className="mb-4">
                  <label
                    className="block  text-left text-black text-sm font-bold mb-2"
                    for="bank-name"
                  >
                    Bank Name:
                  </label>
                  <input
                    onChange={e => setBankname(e.target.value)}
                    className="shadow  bg-white  appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="bank-name"
                    type="text"
                    placeholder="Enter Bank Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-left text-black text-sm font-bold mb-2"
                    for="branch"
                  >
                    Branch:
                  </label>
                  <input
                    onChange={e => setBranch(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white focus:outline-none focus:shadow-outline"
                    id="branch"
                    type="text"
                    required
                    placeholder="Enter Branch"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-left text-black text-sm font-bold mb-2"
                    for="amount"
                  >
                    Amount:
                  </label>
                  <input
                    onChange={e => setAmount(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white focus:outline-none focus:shadow-outline"
                    id="amount"
                    min={data?.buyNowPrice}
                    type="text"
                    placeholder="Enter Amount"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-left text-black text-sm font-bold mb-2"
                    for="transaction-id"
                  >
                    Transaction ID:
                  </label>
                  <input
                    required
                    onChange={e => setTransaction(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white focus:outline-none focus:shadow-outline"
                    id="transaction-id"
                    type="text"
                    placeholder="Enter Transaction ID"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-left  text-black text-sm font-bold mb-2"
                    for="payment-slip"
                  >
                    Payment Slip:
                  </label>
                  <input
                    required
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="payment-slip"
                    type="file"
                    onChange={handleBankSleepuplod}
                  />
                </div>

                {bankSleep && (
                  <img
                    className="w-full h-60  object-contain my-3"
                    src={bankSleep}
                  />
                )}
                <div className="flex justify-center">
                  <button
                    className="bg-[#719f18] hover:[#73471b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      
    </>
  );
}
