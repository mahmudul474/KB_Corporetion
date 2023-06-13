import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Payments() {
  const { data: payments } = useQuery({
    queryKey: "payments",
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/payments`);
      const data = await res.json();
      return data;
    }
  });

  console.log(payments);

  const [isOpen, setIsOpen] = useState(false);

  const openSleep = () => {
    setIsOpen(true);
  };

  const closeSleep = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold my-3 text-left"> Success Payment</h1>
      <hr />
      <table className="w-full text-sm text-left text-black dark:black">
        <thead className="text-xs text-black uppercase bg-gray-50  dark:text-black">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        {payments?.map(payment => (
          <tbody>
            <tr className="bg-white border-b   dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={payment?.bidderPhoto}
                  alt="Jese image"
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {payment?.bidderName}
                  </div>
                  <div className="font-normal text-gray-500">
                    {payment?.bidderEmail}
                  </div>
                </div>
              </th>

              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  {payment?.buyNowPrice}$
                </div>
              </td>
              <td className="">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={payment?.productImg}
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {payment?.productName}
                    </div>
                    <div className="font-normal text-gray-500">
                      {payment?.amount}
                    </div>
                  </div>
                </th>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <img
                    onClick={openSleep}
                    src={payment?.bankSleep}
                    alt="Bank Sleep"
                    className="w-20 h-20 mr-2"
                  />
                </a>
              </td>
              {/* {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                  <div className="bg-white p-8 rounded-md shadow-md z-20">
                    <img
                      src={payment?.bankSleep}
                      alt="Bank Sleep"
                      className="w-500 h-500 mb-4"
                    />
                    <button
                      onClick={closeSleep}
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )} */}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
