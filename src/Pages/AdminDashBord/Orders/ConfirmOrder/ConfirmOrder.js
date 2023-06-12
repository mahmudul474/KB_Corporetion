import React, { useEffect, useState } from "react";

export default function ConfirmOrder({ data, onClose, refetch }) {
  const [paymentDetails, setPaymentDetails] = useState();

  ///  approve

  const handleApprovalPayment = () => {
    const winner = {
      amount: data?.amount,
      bidderName: data?.bidderName,
      bidderId: data?.bidderId,
      bidderEmail: data?.bidderEmail,
      bidderNumber: data?.bidderNumber,
      bidderPhoto: data?.bidderPhoto,
      productName: data?.productName,
      productPhoto: data?.productImg,
      productId: data?.productId
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/payment/admin/order/approve/${data?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(winner)
      }
    )
      .then(res => res.json())
      .then(data => {
        refetch();
        onClose();
      });
  };

  const handlereject = () => {
    const paymentId = {
      id: data._id
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/payment/admin/failed/${data?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentId)
      }
    )
      .then(res => res.json())
      .then(data => {
        refetch();
        onClose();
      });
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center ">
      <div className="bg-white shadow-xl lg:w-[500px]  ">
        <div class="max-w-md mx-auto  shadow-md rounded-md p-6">
          <div class="flex items-center mb-4">
            <img
              onClick={openModal}
              src={data?.productImg}
              alt="Bank Sleep"
              class="w-full h-56 mr-2"
            />
          </div>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
              <div className="bg-white p-8 rounded-md shadow-md z-20">
                <img
                  src={data?.productImg}
                  alt="Bank Sleep"
                  className="w-500 h-500 mb-4"
                />
                <button
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <p class="mb-4">Bank: {data?.bank}</p>

          <p class="mb-4">Branch: {data?.branch}</p>

          <p class="mb-4">Transaction: {data?.transaction}</p>

          <p class="text-lg font-semibold">Amount: {data?.amount}</p>
        </div>

        <div className="flex  justify-center my-4 ">
          <button
            className="btn  bg-green-700 p-3 mr-2 text-white rounded-lg "
            onClick={handleApprovalPayment}
          >
            Approve
          </button>
          <button
            className="btn bg-red-700 p-3 mr-2 text-white rounded-lg "
            onClick={handlereject}
          >
            Reject
          </button>
          <button
            className="btn p-3 text-white rounded-lg  bg-gray-700 "
            onClick={onClose}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}
