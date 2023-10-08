import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import AWS from "aws-sdk";
import DatePicker from "react-datepicker";

export default function SendPaymentDettals({ closeModal,setIsModalOpen, isOpen, data }) {
  const { currentUser } = useContext(AuthContext);
  const [bankSleep, setBanSleep] = useState(null);
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState(null);
  const [branch, setBranch] = useState("");
  const [bank, setBankname] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPriceType, setSelectedPriceType] = useState("");
  const [shippingCost, setShippingCost] = useState(null);

  const TotalShippingCost =
    data.total && parseFloat(data.total.toFixed()) * shippingCost;

  const SubTotal =
    data.total && parseFloat(data.total.toFixed()) + TotalShippingCost;

  ////shopping cost

  useEffect(() => {
    if (selectedLocation in data?.shipping) {
      const price =
        selectedPriceType === "container"
          ? data?.shipping[selectedLocation].containerPrice
          : data?.shipping[selectedLocation].bulkPrice || 0; // Default to 0 if bulk price is not available
      setShippingCost(price);
    }
  }, [selectedLocation, selectedPriceType]);

  const handleLocationChange = e => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);

    // If Dhaka is selected, reset the price type to "container"
    if (newLocation === "dhaka") {
      setSelectedPriceType("container");
    }
  };

  const handlePriceTypeChange = e => {
    setSelectedPriceType(e.target.value);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleBankSleepuplod = event => {
    const file = event.target.files[0];
    const s3 = new AWS.S3();

    const params = {
      Bucket: "kb-corporetion",
      Key: file.name,
      Body: file
      // Set the appropriate ACL based on your requirements
    };

    s3.upload(params, (error, product) => {
      if (error) {
        console.error("Error:", error);
      } else {
        setBanSleep(product.Location);
        console.log("NID photo uploaded successfully:", product.Location);
        // Do something with the uploaded NID photo URL
      }
    });
  };

  const handleSendPaymentDettails = e => {
    e.preventDefault();

    if (selectedDate === "") {
      return alert("Please select  expected date");
    } else if (selectedLocation === "") {
      return alert("Please select Shipment location");
    } else if (selectedPriceType === "") {
      return alert("Please select shipment  type");
    }else if(amount<SubTotal){
      return alert(" amount  to low ")
    }

    const paymentDetails = {
      transaction,
      bankSleep,
      amount,
      branch,
      bank,
      bidderId: data?.bidderId,
      bidderEmail: data?.bidderEmail,
      productId: data?.productID,
      status: "pending",
      products: data,
      shipping: {
        selectedDate,
        selectedLocation,
        selectedPriceType,
        shippingCost,
        TotalShippingCost,
        SubTotal
      }
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/koyel-item/payment/${data?.productID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentDetails)
      }
    )
      .then(res => res.json())
      .then(data => {
         console.log("data close ")
        closeModal();
        setIsModalOpen(false);
        
      });
  };

  return (
    <dialog id="my_modal_4" className="modal  overflow-auto bg-slate-400" open>
      <div className="modal-action">
        <form onSubmit={handleSendPaymentDettails} method=" w-full">
          <div className="flex w-full flex-col-reverse lg:flex-row">
            <div className="  mx-auto">
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

                  min={SubTotal}
                  type="number"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="rounded-md ml-3 bg-gray-500 text-white p-3 "
                  onClick={closeModal}
                >
                  cancel
                </button>
              </div>
            </div>
            <div className="mx-3">
              <div className="flex w-full  flex-col ">
                <label className="text-left text-lg text-black ">
                  Expected Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className="border bordered border-black w-full text-black bg-white  rounded  py-1"
                />
              </div>

              <div className="w-full  text-left ">
                <label
                  htmlFor="location"
                  className="text-left text-black text-lg "
                >
                  Select Shipping location
                </label>
                <select
                  required
                  className="w-full  border p-2 border-black text-black "
                  id="location"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <option disabled value="">
                    {" "}
                    select here{" "}
                  </option>
                  <option value="pangon">Pangon</option>
                  <option value="mongla">Mongla</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chattogram">Chattogram</option>
                </select>
                <br />
                <label
                  className="text-left text-black text-lg "
                  htmlFor="priceType"
                >
                  Select shipment type
                </label>
                <select
                  required
                  className="w-full  border p-2 border-black text-black "
                  id="priceType"
                  value={selectedPriceType}
                  onChange={handlePriceTypeChange}
                  disabled={selectedLocation === "dhaka"}
                >
                  {selectedLocation === "dhaka" ? (
                    <option value="container">Container</option>
                  ) : (
                    <>
                      <option value="" disabled>
                        select here{" "}
                      </option>
                      <option value="container">Container</option>
                      <option value="bulk">Bulk</option>
                    </>
                  )}
                </select>
                <br />
                {selectedLocation && (
                  <p className=" text-xl text-black ">
                    Shipping cost for {selectedLocation}
                  </p>
                )}
                {shippingCost && (
                  <p className=" text-xl text-black ">
                    Price: {shippingCost + "$" + "KG"}
                  </p>
                )}
              </div>

              <div className="flex text-left flex-col">
                <td className="text-black ">
                  Total Item: {data?.winproduct?.length}
                </td>
                <td className="text-black ">
                  Total-Weight: {data.totalWeight + "kg"}
                </td>
                <td className="text-black ">
                  {" "}
                  Per KG Price:
                  {data?.averagePerKgPrice &&
                    data?.averagePerKgPrice.toFixed() + "$"}
                </td>
                <td className="text-black ">
                  Total : {data.total && data?.total.toFixed() + "$"}
                </td>
                <td>Shipping Cost : {TotalShippingCost + "$"}</td>

                <h1>SubTotal: {SubTotal + "$"}</h1>
              </div>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
