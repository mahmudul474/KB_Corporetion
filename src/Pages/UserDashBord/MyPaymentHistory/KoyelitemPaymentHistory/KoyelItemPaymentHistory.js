import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import KoyelItemPaymentRow from "./KoyelItemPaymentRow";

export default function KoyelItemPaymentHistory() {
  const { currentUser } = useContext(AuthContext);

  const [PaymentHistory, setPaymentHistory] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/my-payment-history/koyelitempayment/${currentUser?._id}`
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
            <td>TotalItem</td>
            <td>info</td>
            <td>status</td>
          </tr>
        </thead>
        <tbody>
          {PaymentHistory?.map(data => (
            <KoyelItemPaymentRow data={data}></KoyelItemPaymentRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
