import React from "react";

export default function ActionHistory({ bids }) {
  return (
    <div className="my-10   ">
      <div className=" shadow-md sm:rounded-lg">
        <h1 className="   font-bold text-xl text-[#719f18] text-left my-5 ">
          Bid History
        </h1>

        <div className="">
          {bids && bids.length === 0 ? (
            <h2 className="text-xl  my-6 text-center   text-red-400 capitalize">
              No Bids Yet
            </h2>
          ) : (
            <div className="overflow-x-auto  h[500px] overflow-auto">
              <table className="table    text-black  table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr className="bg-white   text-black ">
                    <td>index</td>
                    <td>Bider</td>
                    <td>Product</td>
                    <td>Product Name</td>
                    <td>Bidding Price</td>
                    <td>Time</td>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {[...bids]?.map((bid, index) => (
                    <tr key={bid._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex  lg:flex-row items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={bid?.bidderPhoto} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{bid?.bidderName}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={bid?.productPhoto} alt="Avatar" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{bid?.productName}</td>
                      <td>{bid.amount}$</td>
                      <td>
                        {new Date(bid.timestamp).toLocaleString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
