import React from "react";
export default function ActionHistory({ bids }) {
  return (
    <div className="my-10   ">
      <div className="relative overflow-auto  h-[300px] shadow-md sm:rounded-lg">
        <h1 className="text-[#719f18]  font-bold text-3xl text-left my-5 ">
          Bid History{" "}
        </h1>
        <table className="w-full capitalize text-sm text-left text-white ">
          <thead className="text-xs text-white uppercase bg-[#719f18] border-b border-[#73471b] dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 bg-[#719f18]">
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
              [...bids]?.reverse().map(bid => (
                <tr className="bg-[#719f18] border-b border-[#73471b]">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium bg-[#719f18] text-white whitespace-nowrap "
                  >
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://i.ibb.co/6vyTQm5/image.png"
                            alt="Avatar"
                          />
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
