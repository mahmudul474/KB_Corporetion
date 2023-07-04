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
        `${process.env.REACT_APP_API_URL}/products/koyel`
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
      `${process.env.REACT_APP_API_URL}/products/admin/delete/${deleteProduct?._id}`,
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
      <h1 className="text-2xl    capitalize  "> Koyel Item </h1>

      <div className=" grid  gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
        {products?.map(product => (
          <KoyelItem
            setDeleteProduct={setDeleteProduct}
            openConfirmationPopup={openConfirmationPopup}
            key={product._id}
            refetch={refetch}
            data={product}
          ></KoyelItem>
        ))}
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
