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
        <div className="modal-box max-w-full">
          <div class=" bg-gray-100 pt-20">
            <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div class="mx-auto justify-center px-6 md:flex  xl:px-0">
              <table className=" lg:w-2/3 text-sm text-left ">
                <thead className="text-xs text-black uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ITEM
                    </th>
                    <th scope="col" className="px-6 py-3">
                      SPEC
                    </th>
                    <th scope="col" className="px-6 py-3">
                      THICKNESS
                    </th>
                    <th scope="col" className="px-6 py-3">
                      WIDTH
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TS
                    </th>
                    <th scope="col" className="px-6 py-3">
                      YP
                    </th>
                    <th scope="col" className="px-6 py-3">
                      EL
                    </th>
                    <th scope="col" className="px-6 py-3">
                      startTing Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      curent Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Buy now
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map(skoyel => (
                    <tr className="bg-white border-b     hover:bg-gray-50  ">
                      <td className="px-6 py-4"> {skoyel?.item}</td>
                      <td className="px-6 py-4">{skoyel?.spec}</td>
                      <td className="px-6 py-4">{skoyel?.Thickness}</td>
                      <td className="px-6 py-4">{skoyel?.Width}</td>
                      <td className="px-6 py-4">{skoyel?.TS}</td>
                      <td className="px-6 py-4">{skoyel?.YP}</td>
                      <td className="px-6 py-4">{skoyel?.EL}</td>
                      <td className="px-6 py-4">{skoyel?.currentBid}</td>
                      <td className="px-6 py-4 ">
                        {skoyel.bids && skoyel.bids.length === 0
                          ? skoyel?.currentBid
                          : skoyel.bids[
                              skoyel.bids.length - 1
                            ].bidAmount.toFixed(2)}
                        $
                      </td>
                      <td className="px-6 py-4">{skoyel?.buyNowPrice}$</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 lg:w-1/3">
                <div class="mb-2 w-full  flex justify-between">
                  <p class="text-gray-700">Subtotal</p>
                  <p class="text-gray-700">${sumBuyNowPrice}</p>
                </div>

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
                    <img
                      className="w-full h-60  object-contain my-3"
                      src={bankSleep}
                    />
                  )}
                  <div className="flex justify-center">
                    <button
                      className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
