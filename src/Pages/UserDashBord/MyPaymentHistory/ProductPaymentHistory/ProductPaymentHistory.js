import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";

export default function ProductPaymentHistory() {
  const { currentUser } = useContext(AuthContext);

  const [PaymentHistory, setPaymentHistory] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/my-payment-history/product/${currentUser?._id}`
    )
      .then(res => res.json())
      .then(data => {
        setPaymentHistory(data);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows  ">
        <thead className="bg-white text-black">
          <tr className="bg-white text-black">
            <td>Product</td>
            <td>Amount</td>
            <td>Info</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {PaymentHistory?.map(data => (
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={data?.productImg}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{data?.productName}</div>
                  </div>
                </div>
              </td>
              <td>{data?.amount + "$"}</td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={data?.bankSleep}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">T.ID{data?.transaction}</div>
                </div>
              </div>
              <td>
                {" "}
                <td>
                  {data?.status === "pending" || data?.status === "approved" ? (
                    <button className="btn btn-success">{data?.status}</button>
                  ) : (
                    <button className="btn btn-error">Field</button>
                  )}
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
