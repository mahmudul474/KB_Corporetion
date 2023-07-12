import React, { useContext } from "react";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import BuyItemrow from "./BuyItemrow";

export default function KoyelItembuy() {
  const { currentUser } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data: purcessItem = []
  } = useQuery({
    queryKey: ["purcessItem", currentUser],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/product/koyel-item/${currentUser?._id}/order`
      );
      const data = await res.json();
      return data;
    }
  });

  return (
    <div className="h-[400px]">
      <div className="overflow-auto ">
        <table className="table table-xs table-pin-rows ">
          <thead className="bg-white  text-black">
            <tr className="bg-white  text-black">
              <td>Product</td>
              <td>Total Items</td>
              <td>Items</td>
              <td>Amount</td>
              <td>Payment Details</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {[...purcessItem].reverse().map(item => (
              <BuyItemrow data={item} key={item?._id}></BuyItemrow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
