import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";

export default function SellerRequest() {
  const { data: sellerRequest = [], refetch } = useQuery({
    queryKey: ["sellerRequest"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/host-requests`
      );
      const data = await res.json();
      return data;
    }
  });

  const handelmakeseller = email => {
    console.log(email);

    fetch(
      `${process.env.REACT_APP_API_URL}/admin/sellerRequests/approve/${email}`,
      {
        method: "PUT"
      }
    )
      .then(res => res.json())
      .then(data => {
        refetch();
        toast.success("make seller successful");
      });
  };

  const [deleteSelleremail, setDeleteSelleremail] = useState(null);
  const [showConfirmationPopup, setConfirmationPopup] = useState(false);

  const openConfirmationPopup = () => {
    setConfirmationPopup(true);
  };

  const closeConfirmationPopup = () => {
    setConfirmationPopup(false);
  };

  const handleDeleteseller = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/deleteseller/${deleteSelleremail}`,
      {
        method: "DELETE"
      }
    )
      .then(res => res.json())
      .then(data => {
        refetch();
        toast.success(data.message);
        closeConfirmationPopup();
      });
  };

  return (
    <div>
      <h1 className=" text-3xl capitalize font-semibold text-green ">
        {" "}
        seller request
      </h1>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Seller
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sellerRequest?.map(seller => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={seller?.info?.userPhoto}
                  alt=" seller  img "
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {seller?.info.name}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">{seller?.email}</td>
              <td className="px-6 py-4 cursor-pointer">
                {seller?.status === "seller" ? (
                  <div className="flex items-center disabled cursor-pointer">
                    <div className="h-2.5 w-2.5 cursor-pointer rounded-full bg-green-500 mr-2"></div>{" "}
                    <p className=" disabled "> {seller?.status}</p>
                  </div>
                ) : (
                  <div
                    onClick={() => handelmakeseller(seller.email)}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="h-2.5 w-2.5 cursor-pointer rounded-full bg-red-500 mr-2"></div>{" "}
                    {seller?.status}
                  </div>
                )}
              </td>

              <td className="px-6 py-4">
                <p
                  onClick={() => {
                    setDeleteSelleremail(seller?.email);
                    openConfirmationPopup();
                  }}
                  className="font-medium text-red-600 dark:text-red-500  cursor-pointer"
                >
                  X
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {showConfirmationPopup && (
          <ConfirmationModal
            data={"are you sure   delete " + deleteSelleremail}
            submit={handleDeleteseller}
            onClose={closeConfirmationPopup}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
}
