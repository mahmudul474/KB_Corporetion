import React from "react";

export default function ActionHistory({ bids }) {



 

return (
  <div className="my-10   ">
    <div className=" overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-green-600  font-bold text-3xl text-left my-5 ">
        Bid History{" "}
      </h1>
      <table className="w-full capitalize text-sm text-left text-white dark:text-blue-100">
        <thead className="text-xs text-white uppercase bg-green-600 border-b border-green-400 dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3 bg-green-500">
              Bidder
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>

            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {bids && bids.length === 0 ? (
            <tr>
              <h3 className="text-center mx-auto text-red-600  block text-xl   text-capitalize text-capitalize font-font-semibold my-5">
                No Bids yet
              </h3>
            </tr>
          ) : (
            bids?.map(bid => (
              <tr className="bg-green-600 border-b border-green-400">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium bg-green-500 text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={bid?.bidderPhoto} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{bid?.bidderName}</div>
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{bid?.productName}</td>

                <td className="px-6 py-4">$ {bid.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}
