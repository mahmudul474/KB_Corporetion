import React, { useContext, useState } from "react";
import AWS from "aws-sdk";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";

export default function BuyNow({ id, data }) {
  const sumBuyNowPrice = data.reduce((total, item) => {
    const buyNowPrice = parseInt(item.buyNowPrice);
    if (!isNaN(buyNowPrice)) {
      return total + buyNowPrice;
    }
    return total;
  }, 0);

  console.log(id, "this is id use");

  ////when   multyple tone

  //  const totalPriceByWidth = data.reduce((total, item) => {
  //    const buyNowPrice = parseInt(item.buyNowPrice);
  //    const width = item.Width;
  //    if (!isNaN(buyNowPrice) && !isNaN(width)) {
  //      return total + buyNowPrice * width;
  //    }
  //    return total;
  //  }, 0);

  //  console.log(totalPriceByWidth);

  const { currentUser } = useContext(AuthContext);
  const [bankSleep, setBanSleep] = useState(null);
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [branch, setBranch] = useState("");
  const [bank, setBankname] = useState("");

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
      productImg: data?.mainImage
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
        console.log(data);
      });
  };

  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-full  bg-white shadow-gray-50">
          <div class=" bg-gray-100 pt-20">
            <h1 class="mb-10 text-center text-black text-2xl font-bold">
              {" "}
              Items
            </h1>
            <div class="mx-auto justify-center px-6  flex flex-col lg:flex-row xl:px-0">
              <div className=" lg:w-2/3 h-[400px] w-full overflow-auto">
                <table className=" table table-xs table-pin-rows  ">
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
                      <tr className="bg-white border-b     hover:bg-gray-50  ">
                        <td className="text-black bg-white"> {skoyel?.item}</td>
                        <td className="text-black bg-white">{skoyel?.spec}</td>
                        <td className="text-black bg-white">
                          {skoyel?.Thickness}
                        </td>
                        <td className="text-black bg-white">{skoyel?.Width}</td>
                        <td className="text-black bg-white">
                          {skoyel?.weight}
                        </td>
                        <td className="text-black bg-white">{skoyel?.TS}</td>
                        <td className="text-black bg-white">{skoyel?.YP}</td>
                        <td className="text-black bg-white">{skoyel?.EL}</td>
                        <td className="text-black bg-white">
                          {skoyel?.currentBid}
                        </td>
                        <td className="text-black bg-white">
                          {skoyel.bids && skoyel.bids.length === 0
                            ? skoyel?.currentBid
                            : skoyel.bids[
                                skoyel.bids.length - 1
                              ].bidAmount.toFixed(2)}
                          $
                        </td>
                        <td className="text-black bg-white">
                          {skoyel?.buyNowPrice}$
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 lg:w-1/3 w-full">
                <div class="mb-2 w-full  flex justify-between">
                  <p class="text-black">Subtotal</p>
                  <p class="text-black">${sumBuyNowPrice}</p>
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
                      className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white focus:outline-none focus:shadow-outline"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white focus:outline-none focus:shadow-outline"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white focus:outline-none focus:shadow-outline"
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
                      className="bg-[#719f18] cursor-pointer hover:bg-[#73471b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn text-white bg-[#719f18] hover:bg-[#73471b]"
            >
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
