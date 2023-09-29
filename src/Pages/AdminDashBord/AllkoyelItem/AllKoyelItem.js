import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import KoyelItem from "./KoyelITem/KoyelItem";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";
import LoadingSpiner from "../../../Shared/LoadingSpiner/LoadingSpiner";

export default function AllKoyelItem() {
  const {
    data: products = [],
    refetch,
    isLoading
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/items/v1`
      );
      const data = await res.json();
      return data;
    }
  });

  const [showConfirmationPopup, setConfirmationPopup] = useState(false);

  const [deleteProduct, setDeleteProduct] = useState(null);
  const openConfirmationPopup = () => {
    setConfirmationPopup(true);
  };
  const closeConfirmationPopup = () => {
    setConfirmationPopup(false);
  };

  const handleDleteProduct = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/product/${deleteProduct?._id}`,
      {
        method: "DELETE"
      }
    )
      .then(res => res.json())
      .then(data => {
        refetch();
        closeConfirmationPopup();
        toast.success(data.message);
      });
  };

  if (isLoading) {
    return <LoadingSpiner></LoadingSpiner>;
  }

  return (
    <div>
      <h1 className="text-2xl my-3 text-left  font-semibold   capitalize text-[#719f18]">
        {" "}
        All Products
      </h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr className="text-black bg-white">
                <td>Product</td>
                <td>Type</td>
                <td>Buy Price</td>
                <td>Start Bid</td>
                <td>Minimum Bid</td>
                <td>Time</td>
                <td>Details</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {[...products]?.reverse().map(product => (
                <KoyelItem
                  setDeleteProduct={setDeleteProduct}
                  openConfirmationPopup={openConfirmationPopup}
                  key={product._id}
                  refetch={refetch}
                  data={product}
                ></KoyelItem>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        {showConfirmationPopup && (
          <ConfirmationModal
            data={deleteProduct?.name}
            submit={handleDleteProduct}
            onClose={closeConfirmationPopup}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
}
