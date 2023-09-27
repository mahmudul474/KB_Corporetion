import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ItemWinRow from "./ItemWinRow";

export default function KoyelItemWin() {
  const { currentUser } = useContext(AuthContext);

  const {
    data: koyelItemswin = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["koyelItemswin", currentUser],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/my-wins/${currentUser?._id}/koyel?email=${currentUser?.email}`
      );
      const data = await res.json();
      return data;
    }
  });

  return (
    <div className="h-[400px]">
      <div className="overflow-auto ">
        <table className="table table-xs table-pin-rows ">
          <thead className="bg-white text-black">
            <tr className="bg-white text-black">
              <td className="bg-white text-black">Product</td>
              <td className="bg-white text-black">Total Item</td>
              <td className="bg-white text-black">Items</td>
              <td className="bg-white text-black">Total Price</td>
              <td className="bg-white text-black">Payment</td>
              <td className="bg-white text-black">status</td>
              <td className="bg-white text-black">details</td>
            </tr>
          </thead>
          <tbody>
            {[...koyelItemswin]?.reverse().map(product => (
              <ItemWinRow data={product}></ItemWinRow>
            ))}
          </tbody>
          <tfoot className="bg-white text-black">
            <tr className="bg-white text-black">
              <td className="bg-white text-black">Product</td>
              <td className="bg-white text-black">Total Item</td>
              <td className="bg-white text-black">Items</td>
              <td className="bg-white text-black">Total Price</td>
              <td className="bg-white text-black">Payment</td>
              <td className="bg-white text-black">status</td>
              <td className="bg-white text-black">details</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
