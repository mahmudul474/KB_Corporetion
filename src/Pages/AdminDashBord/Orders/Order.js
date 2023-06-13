import React, { useState } from "react";
import Animation from "../../../Shared/Animation/Animation";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ConfirmOrder from "./ConfirmOrder/ConfirmOrder";

export default function Order() {
  const {
    data: orders = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: "orders",
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
      const data = await res.json();
      return data;
    }
  });

  const [productId, setProductId] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4 bg-white  ">
          <div>
            <button
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5   dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              Order
            </button>
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for  order"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50   dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Buy-Price
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer
              </th>
              <th scope="col" className="px-6 py-3">
                Dittails
              </th>
              <th scope="col" className="px-6 py-3">
                payment
              </th>
              <th scope="col" className="px-6 py-3">
                message
              </th>
            </tr>
          </thead>

          {orders?.map(product => (
            <tbody>
              <tr className="bg-white border-b   dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={product?.productImg}
                    alt="product img"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {product.productName}
                    </div>
                    <div className="font-normal text-gray-500">{}</div>
                  </div>
                </th>

                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    {product?.buyNowPrice}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <div className="flex  items-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={product.bidderPhoto}
                        alt="product img"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {product.bidderName}
                        </div>
                        <div className="font-normal text-gray-500">
                          {product?.bidderEmail}
                        </div>
                        <div className="font-normal text-gray-500">
                          Price: {product?.amount}
                        </div>
                      </div>
                    </div>
                  </a>
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
                  <a
                    onClick={() => {
                      setProductId(product);
                      openPopup();
                    }}
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {product?.status}
                  </a>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div>
          {showPopup && (
            <ConfirmOrder
              refetch={refetch}
              onClose={closePopup}
              data={productId}
            ></ConfirmOrder>
          )}
        </div>
      </div>
    </div>
  );
}
