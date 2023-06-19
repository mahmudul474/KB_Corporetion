import React, { useEffect, useState } from "react";

export default function WinPayment({ id, onClose, refetch }) {
  const [paymentDetails, setPaymentDetails] = useState();

  console.log(paymentDetails);

  useEffect(() => {
    if (id) {
      fetch(`https://kb-corporate-devsobuj910.vercel.app/product/payment/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setPaymentDetails(data); // Update the state with fetched payment details
        });
    }
  }, [id]);

  ///  approve

  const handleApprovalPayment = () => {
    const paymentId = {
      id: paymentDetails?._id
    };
    fetch(`${process.env.REACT_APP_API_URL}/payment/admin/approve/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentId)
    })
      .then(res => res.json())
      .then(data => {
        refetch();
        onClose();
      });
  };

  const handlefaild = () => {
    const paymentId = {
      id: paymentDetails?._id
    };
    fetch(`${process.env.REACT_APP_API_URL}/payment/admin/failed/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentId)
    })
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
      <div className="bg-slate-200 shadow-xl ">
        <div class="max-w-md mx-auto  shadow-md rounded-md p-6">
          <div class="flex items-center mb-4">
            <img
              onClick={openModal}
              src={paymentDetails?.bankSleep}
              alt="Bank Sleep"
              class="w-full h-56 mr-2"
            />
          </div>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
              <div className="bg-white p-8 rounded-md shadow-md z-20">
                <img
                  src={paymentDetails?.bankSleep}
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

          <p class="mb-4">Bank: {paymentDetails?.bank}</p>

          <p class="mb-4">Branch: {paymentDetails?.branch}</p>

          <p class="mb-4">Transaction: {paymentDetails?.transaction}</p>

          <p class="text-lg font-semibold">Amount: {paymentDetails?.amount}</p>
        </div>

        <div className="flex my-4  capitalize  justify-center items-center">
          <button
            className="bg-green-600 mr-2 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            onClick={handleApprovalPayment}
          >
            Approve
          </button>
          <button
            className="bg-red-500 mr-2 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            onClick={handlefaild}
          >
            failed
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            onClick={onClose}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}
