import React, { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SendPaymentDettals from "./SendPaymentDettails/SendPaymentDettals";

export default function WinningBids() {
  const { currentUser } = useContext(AuthContext);

  const { data: winBidds } = useQuery({
    queryKey: ["winBidds", currentUser?.email],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/my-wins?email=${currentUser?.email}`
      );
      const data = await res.json();
      return data;
    }
  });
  const [showPopup, setShowPopup] = useState(false);

  const [paymentProduct, setPaymentProduct] = useState(null);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="mt-10">
      <h1 className="text-4xl capitalize  text-left mb-3 pt-10 px-5 font-semibold">
        Win Bids
      </h1>
      <div className="grid px-5 grid-cols-1 lg:grid-cols-2 gap-5">
        {winBidds?.map(data => (
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="border ">
              <img
                className="rounded-t-lg w-full text-center h-60 object-contain "
                src={data?.mainImage}
                alt=""
              />
            </div>

            <div className="p-5 text-left capitalize">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data?.name}
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {data?.description} <Link> ...</Link>
              </p>

              <h1>
                <p className="text-lg text-green-700  font-semibold">
                  winner: {data?.winner?.bidderName}
                </p>

                <p className="text-lg text-red-600 capitalize  font-semibold">
                  Email: {data?.winner?.bidderEmail}
                </p>
              </h1>

              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  Winning Price:{data?.winner?.amount} $
                </h2>

                <Link to={`/action/${data._id}`}>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View Details
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </Link>
              </div>

              <button
                onClick={() => {
                  setPaymentProduct(data);
                  openPopup();
                }}
              >
                send Payment Details{" "}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        {showPopup && (
          <SendPaymentDettals data={paymentProduct} onClose={closePopup} />
        )}
      </div>
    </div>
  );
}
