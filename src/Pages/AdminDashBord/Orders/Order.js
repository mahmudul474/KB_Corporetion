import React, { useState } from "react";
import Animation from "../../../Shared/Animation/Animation";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ConfirmOrder from "./ConfirmOrder/ConfirmOrder";
import LoadingSpiner from "../../../Shared/LoadingSpiner/LoadingSpiner";

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



if (isLoading){
  return <LoadingSpiner></LoadingSpiner>
}
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4 bg-white  ">
          <div>
            <button
              className="inline-flex items-center text-black  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5   "
              type="button"
            >
              Order
            </button>
          </div>
        </div>

        <div className="overflow-auto h-full ">
          <table className="table table-xs table-pin-rows  ">
            <thead className="text-xs text-black  uppercase bg-gray-50   ">
              <tr className="text-black bg-white">
                <th>Product</th>
                <th>Buy-Price</th>
                <th>Buyer</th>
                <th>Details</th>
                <th>payment</th>
              </tr>
            </thead>

            {[...orders]?.reverse().map(product => (
              <tbody>
                <tr className="bg-white border-b  hover:bg-gray-50">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4  whitespace-nowrap  "
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
                      <div className="font-normal border-black ">{}</div>
                    </div>
                  </th>

                  <td>
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      {product?.buyNowPrice + "$"}
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="font-medium text-[#719f18]dark:text-blue-500 hover:underline"
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
                          <div className="font-normal border-black ">
                            Phone: {product?.bidderNumber}
                          </div>
                          <div className="font-normal border-black ">
                            {product?.bidderEmail}
                          </div>
                          <div className="font-normal border-black ">
                            Price: {product?.amount}
                          </div>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td>
                    <Link
                      to={`/admin-dashboard/action/${product.productId} `}
                      className="font-medium text-[#719f18]dark:text-blue-500 hover:underline"
                    >
                      Details
                    </Link>
                  </td>

                  <td>
                    <a
                      onClick={() => {
                        setProductId(product);
                        openPopup();
                      }}
                      className="font-medium cursor-pointer text-[#719f18]  hover:underline"
                    >
                      {product?.status === "pending" ||
                      product?.status === "approved" ? (
                        <button className="btn btn-success">Approve</button>
                      ) : (
                        <button className="btn btn-error">Field</button>
                      )}
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

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
