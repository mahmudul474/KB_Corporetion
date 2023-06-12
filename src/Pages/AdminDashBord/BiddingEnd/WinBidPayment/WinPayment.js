import React, { useEffect, useState } from "react";

export default function WinPayment({ id, onClose, refetch }) {
  const [paymentDetails, setPaymentDetails] = useState();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/product/payment/${id}`)
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
         refetch()
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

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center ">
      <div className="bg-slate-200 shadow-xl ">
        {paymentDetails?.bidderEmail}
        <button onClick={handleApprovalPayment}>Approve</button>
        <button onClick={handlefaild}>faild</button>
        <button onClick={onClose}>close</button>
      </div>
    </div>
  );
}
