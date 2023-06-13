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
        console.log(data);
        if (data.acknowledged) {
          navigate("/my-dashboard/buy");
        }
      });
  };

  return (
    <>
      <div
        className="w-full   z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
        id="checkout"
      >
        <div
          className="flex items-end lg:flex-row flex-col justify-center"
          id="cart"
        >
          <div
            className="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-hidden overflow-x-hidden lg:h-screen h-auto"
            id="scroll"
          >
            <div className="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer">
              <Link to={`/action/${data?._id}`}>
                <p className="text-sm pl-2 leading-none dark:hover:text-gray-200">
                  Back
                </p>
              </Link>
            </div>

            <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
              <div className="  w-full">
                <img
                  src={data?.mainImage}
                  className="h-full object-center object-cover md:block "
                />
              </div>
            </div>
            <div className="md:pl-3 m   flex flex-col justify-center">
              <div className="flex items-center justify-between w-full pt-1">
                <p className="  text-3xl font-black leading-none text-gray-800 dark:text-white">
                  Name: {data?.name}
                </p>
              </div>

              <div className="flex items-center justify-between pt-5">
                <p className="font-black  text-3xl   leading-none text-gray-800 dark:text-white">
                  Price: {data?.buyNowPrice} $
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900  ">
            <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
              <div>
                <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">
                  Summary
                </p>
                <div className="flex items-center justify-between pt-16">
                  <p className="text-base font-bold leading-none text-gray-800 dark:text-white">
                    Subtotal
                  </p>
                  <p className="text-base leading-none text-gray-800 dark:text-white">
                    {data?.buyNowPrice}
                  </p>
                </div>

                <div className="container mx-auto py-8">
                  <form
                    onSubmit={handlSubmitOrder}
                    className="max-w-md mx-auto"
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
                        onChange={e => setBranch(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="branch"
                        type="text"
                        required
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
                        onChange={e => setAmount(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        min={data?.buyNowPrice}
                        type="text"
                        placeholder="Enter Amount"
                        required
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
                      <img
                        className="w-full h-60  object-contain my-3"
                        src={bankSleep}
                      />
                    )}
                    <div className="flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
