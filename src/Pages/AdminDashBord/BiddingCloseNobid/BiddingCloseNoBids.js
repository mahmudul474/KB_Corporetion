import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import EditProductPopUp from "../AllProducts/Product_Card/ProductEditPopup/EditProductPopUp";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";

export default function BiddingCloseNoBids() {
  const {
    data: products = [],
    refetch,
    isLoading
  } = useQuery({
    queryKey: "products",
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/no-bids-end-time`
      );
      const data = await res.json();
      return data;
    }
  });

  const [editProduct, setEditProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

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

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4 bg-white  ">
          <div>
            <button
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5   dark:text-gray-700 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              Bidding end
            </button>
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-black "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Start bid
              </th>
              <th scope="col" className="px-6 py-3">
                Buy price
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>

          {products?.map(product => (
            <tbody>
              <tr className="bg-white border-b   dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap  "
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={product?.mainImage}
                    alt="product img"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {product.name}
                    </div>
                    <div className="font-normal text-gray-500">{}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{product?.startBiddingPrice}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    {product?.buyNowPrice}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin-dashboard/action/${product._id} `}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Details
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setEditProduct(product);
                      openPopup();
                    }}
                    type="button"
                    class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                  >
                    <span>
                      <FiEdit></FiEdit>
                    </span>
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setDeleteProduct(product);
                      openConfirmationPopup();
                    }}
                    type="button"
                    class="text-white   bg-red-600   focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                  >
                    <span>
                      <AiOutlineDelete></AiOutlineDelete>
                    </span>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div>
          {showPopup && (
            <EditProductPopUp
              data={editProduct}
              refetch={refetch}
              onClose={closePopup}
            />
          )}
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
    </div>
  );
}
