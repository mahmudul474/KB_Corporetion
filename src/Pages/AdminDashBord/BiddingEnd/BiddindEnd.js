import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminWiner from "./winner/AdminWiner";
import { useQuery } from "@tanstack/react-query";
import WinPayment from "./WinBidPayment/WinPayment";
import LoadingSpiner from "../../../Shared/LoadingSpiner/LoadingSpiner";

export default function BiddindEnd() {
  const {
    data: products = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: "products",
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/closed-bids/with-bids`
      );
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

  if (isLoading) {
    return <LoadingSpiner></LoadingSpiner>;
  }
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4 bg-white  ">
          <div>
            <button
              className="inline-flex items-center text-black bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5    "
              type="button"
            >
              Bidding end
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left text-black  ">
          <thead className="text-xs uppercase bg-gray-50">
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
                winner
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              <th scope="col" className="px-6 py-3">
                Payment
              </th>
            </tr>
          </thead>

          {products?.map(product => (
            <tbody>
              <tr className="bg-white border-b     hover:bg-gray-50 ">
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
                    <div className="font-normal text-black">{}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{product?.startBiddingPrice}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#719f18] mr-2"></div>{" "}
                    {product?.buyNowPrice}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-black hover:underline"
                  >
                    <div className="flex  items-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={product.winner?.bidderPhoto}
                        alt="product img"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {product.winner?.bidderName}
                        </div>
                        <div className="font-normal text-black">
                          {product.winner?.bidderEmail}
                        </div>
                        <div className="font-normal text-black">
                          Price: {product.winner?.amount}
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

                {product?.payment === "pending" ||
                product?.payment === "approved" ? (
                  <td className="px-6 py-4">
                    <a
                      onClick={() => {
                        setProductId(product._id);
                        openPopup();
                      }}
                      className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {product?.payment}
                    </a>
                  </td>
                ) : (
                  <td className="px-6 py-4">
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Not Pay
                    </a>
                  </td>
                )}
              </tr>
            </tbody>
          ))}
        </table>
        <div>
          {showPopup && (
            <WinPayment
              refetch={refetch}
              onClose={closePopup}
              id={productId}
            ></WinPayment>
          )}
        </div>
      </div>
    </div>
  );
}
