import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";

export default function KoyelItemOrder() {
  const [koyelItemOrders, setKoyelItemOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/koyel-item/order`)
      .then(res => res.json())
      .then(data => {
        setKoyelItemOrders(data);
      });
  }, []);

  console.log(koyelItemOrders, " this is koyel ite order ");

  return (
    <div>
      <h1 className="text-xl font-semibold text-[#719f18]">order Item</h1>
      <div className="overflow-auto h-screen">
        <table className="table table-xs table-pin-rows ">
          <thead>
            <tr className="bg-white text-black">
              <td>Product</td>
              <td>Items</td>
              <td>Show Item</td>
              <td>Buyer</td>
              <td>Payment </td>
              <td>Status</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {[...koyelItemOrders]?.reverse().map(order => (
              <OrderRow data={order} key={order._id}></OrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
