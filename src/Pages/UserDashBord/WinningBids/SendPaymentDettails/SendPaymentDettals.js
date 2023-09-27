import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import AWS from "aws-sdk";

export default function SendPaymentDettals({ onClose, data }) {
  const { currentUser } = useContext(AuthContext);
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

  const handleSendPaymentDettails = e => {
    e.preventDefault();
    const paymentDetails = {
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
      status: "pending"
    };

    fetch(`${process.env.REACT_APP_API_URL}/payments/details/${data?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentDetails)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.acknowledged) {
          onClose();
        }
      });
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center ">
      <div className="bg-white shadow-xl p-5">
        <form
          onSubmit={handleSendPaymentDettails}
          className="max-w-md  mx-auto"
        >
          <div className="mb-4">
            <label
              className="block  text-left text-gray-700 text-sm font-bold mb-2"
              for="bank-name"
            >
              Bank Name:
            </label>
            <input
              onChange={e => setBankname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bank-name"
              type="text"
              placeholder="Enter Bank Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block  text-left text-gray-700 text-sm font-bold mb-2"
              for="branch"
            >
              Branch:
            </label>
            <input
              required
              onChange={e => setBranch(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="branch"
              type="text"
              placeholder="Enter Branch"
            />
          </div>
          <div className="mb-4">
            <label
              className="block  text-left text-gray-700 text-sm font-bold mb-2"
              for="amount"
            >
              Amount:
            </label>
            <input
              required
              onChange={e => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              min={data?.buyNowPrice}
              type="text"
              placeholder="Enter Amount"
            />
          </div>
          <div className="mb-4">
            <label
              className="block  text-left text-gray-700 text-sm font-bold mb-2"
              for="transaction-id"
            >
              Transaction ID:
            </label>
            <input
              required
              onChange={e => setTransaction(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="transaction-id"
              type="text"
              placeholder="Enter Transaction ID"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-left  text-gray-700 text-sm font-bold mb-2"
              for="payment-slip"
            >
              Payment Slip:
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="payment-slip"
              type="file"
              onChange={handleBankSleepuplod}
            />
          </div>

          {bankSleep && (
            <img className="w-full h-60  object-contain my-3" src={bankSleep} />
          )}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <button
              className="rounded-md ml-3 bg-gray-500 text-white p-3"
              onClick={onClose}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
