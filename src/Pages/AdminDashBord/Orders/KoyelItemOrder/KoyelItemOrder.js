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
      <h1>order Item</h1>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td>Name</td>
              <td>Job</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
            </tr>
          </thead>
          <tbody>
            {koyelItemOrders?.map(order => (
              <OrderRow data={order} key={order._id}></OrderRow>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Name</td>
              <td>Job</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
