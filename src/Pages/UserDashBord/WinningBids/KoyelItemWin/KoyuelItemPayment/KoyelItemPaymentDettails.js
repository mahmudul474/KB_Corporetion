import React, { useContext, useState } from "react";

import AWS from "aws-sdk";
import { AuthContext } from "../../../../../auth/AuthProbaider/AuthProvider";
import { toast } from "react-hot-toast";

export default function KoyelItemPaymentDettails({ close, data, refetch }) {
  console.log(data, "this data ");

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

    const items = data?.winners.map(item => ({
      koyel: item,
      koyelId: item.koyelId
    }));

    console.log(items, "items here");

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
      productImg: data?.mainImage
    };

    fetch(`${process.env.REACT_APP_API_URL}/koyel-item/payment/${data?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ paymentDetails, items })
    })
      .then(res => res.json())
      .then(data => {
        refetch();
        close();
        toast.success("Payment details send  successfully");
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
              className="block  text-left text-black text-sm font-bold mb-2"
              for="bank-name"
            >
              Bank Name:
            </label>
            <input
              onChange={e => setBankname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none bg-white focus:shadow-outline"
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
              required
              onChange={e => setBranch(e.target.value)}
              className="shadow bg-white  appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="branch"
              type="text"
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
              required
              onChange={e => setAmount(e.target.value)}
              className="shadow  bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              min={data?.buyNowPrice}
              type="text"
              placeholder="Enter Amount"
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
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow  appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
              className="bg-[#719f18] hover:bg-[#73471b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>

            <button
              className="rounded-md ml-3 bg-[#73471b] text-white p-3"
              onClick={close}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
