import React, { useContext, useState } from "react";
import AWS from "aws-sdk";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Tab } from '@headlessui/react'
import coomingsoon from "./cooming.gif"

export default function BuyNow({
  id,
  data,
  close,
  shipmentType,
  expectedDate,
  landing,
  shippingCost
}) {
 


  const { currentUser } = useContext(AuthContext);
  const [bankSleep, setBanSleep] = useState(null);
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [branch, setBranch] = useState("");
  const [bank, setBankname] = useState("");

  const navigate = useNavigate();
  // handle bank sleep upload
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

  ///handle send payment   dettails
  const handleSendPaymentDettails = e => {
    console.log(id);
    e.preventDefault();

    const items = data.map(item => ({
      koyelId: item._id,
      koyel: item
    }));

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
      landing,
      expectedDate,
      shipmentType
    };

    fetch(`${process.env.REACT_APP_API_URL}/product/koyel-item/order/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ paymentDetails, items })
    })
      .then(res => res.json())
      .then(data => {
        navigate("/my-dashboard/buy");
      });
  };

  return (
    <>
      <div className=" fixed z-50   shadow-2xl  bg-base-100 inset-0    ">
        <div className="max-w-full p-7 bg-white">
          <div className=" bg-gray-100 pt-20 ">
            <div className="mx-auto justify-center px-6  flex flex-col lg:flex-row xl:px-0">
              <div className=" lg:w-2/3 h-[400px] w-full ">
                <table className=" p-4 table table-xs table-pin-rows  ">
                  <thead className="text-xs text-black uppercase bg-gray-50 ">
                    <tr>
                      <th className="text-black bg-white">ITEM</th>
                      <th className="text-black bg-white">SPEC</th>
                      <th className="text-black bg-white">THICKNESS</th>
                      <th className="text-black bg-white">WIDTH</th>
                      <th className="text-black bg-white">weight</th>
                      <th className="text-black bg-white">TS</th>
                      <th className="text-black bg-white">YP</th>
                      <th className="text-black bg-white">EL</th>
                      <th className="text-black bg-white">start Price</th>
                      <th className="text-black bg-white">current Price</th>
                      <th className="text-black bg-white">Buy now</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map(skoyel => (
                      <tr className="bg-white border-b    hover:bg-gray-50  ">
                        <td> {skoyel?.item}</td>
                        <td>{skoyel?.spec}</td>
                        <td>{skoyel?.Thickness}</td>
                        <td>{skoyel?.Width}</td>
                        <td>{skoyel?.weight}</td>
                        <td>{skoyel?.TS}</td>
                        <td>{skoyel?.YP}</td>
                        <td>{skoyel?.EL}</td>
                        <td>{skoyel?.currentBid}</td>
                        <td className="px-6 py-4 ">
                          {skoyel.bids && skoyel.bids.length === 0
                            ? skoyel?.currentBid
                            : skoyel.bids[
                                skoyel.bids.length - 1
                              ].bidAmount.toFixed(2)}
                          $
                        </td>
                        <td>{skoyel?.buyNowPrice}$</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="text-lg text-black my-2">Payment</h2>
                <div className="mb-2 w-full  flex justify-center items-center">
                  <p className="text-black">
                    SubTotal = 
                  </p>
                </div>
                <Tab.Group manual>
                  <Tab.List>
                    <Tab>
                      <button className="btn btn-primary mr-2">Online</button>
                    </Tab>
                    <Tab>
                      <button className="btn btn-secondary">Offline</button>
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <div>
                        <img
                          className="rounded-full w-96 h-96"
                          src={coomingsoon}
                          alt="image description"
                        />
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      {" "}
                      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 w-full">
                        <div className="mb-2 w-full  flex justify-between">
                          <p className="text-black">Price = </p>
                          <p className="text-black"></p>
                        </div>
                        <div className="mb-2 w-full  flex justify-between">
                          <p className="text-black">Shipping = </p>
                          <p className="text-black"></p>
                        </div>
                        <div className="mb-2 w-full  flex justify-between">
                          <p className="text-black">SubTotal = </p>
                          <p className="text-black">
                            
                          </p>
                        </div>

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
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white focus:outline-none focus:shadow-outline"
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
                              className=" bg-white  shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
                              className="bg-white   shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                              id="amount"
                              min=""
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
                              className="bg-white    shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
                              className=" bg-white  shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                              id="payment-slip"
                              type="file"
                              onChange={handleBankSleepuplod}
                            />
                          </div>

                          {/* {bankSleep && (
                    <img
                      className="w-full h-60  object-contain my-3"
                      src={bankSleep}
                    />
                  )} */}
                          <div className="flex justify-center">
                            <button
                              className=" cursor-pointer bg-transparent border  text-black  border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Submit
                            </button>

                            <button
                              onClick={close}
                              className="bg-[#719f18] hover:bg-[#73471b] btn text-white ml-3"
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
