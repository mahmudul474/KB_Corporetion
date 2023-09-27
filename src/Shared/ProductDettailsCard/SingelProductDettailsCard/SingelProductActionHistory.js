import React from "react";

export default function SingelProductActionHistory({ bids }) {
  const reversedBids = bids ? [...bids].reverse() : [];

  return (
    <div className="my-10   ">
      <div className=" overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="   font-bold text-xl text-[#719f18] text-left my-5 ">
          Bid History
        </h1>

        <div className="  shadow-md sm:rounded-lg ">
          {reversedBids && reversedBids.length === 0 ? (
            <div>
              {" "}
              <h2 className="text-xl  my-6 text-center   text-red-400 capitalize">
                No Bids Yet
              </h2>{" "}
            </div>
          ) : (
            <div className="h-[400px] overflow-auto">
              <table className="table table-xs table-pin-rows ">
                <thead>
                  <tr className="bg-white">
                   
                    <td className="text-black bg-white">Bider</td>
                    <td className="text-black bg-white">Product</td>
                    <td className="text-black bg-white">Product Name</td>
                    <td className="text-black bg-white">Total Item</td>
                    <td className="text-black bg-white">Bidding Price</td>
                    <td className="text-black bg-white">item</td>
                  </tr>
                </thead>
                <tbody>
                  {reversedBids?.map((bid, index) => (
                    <tr key={bid._id}>
                      <td>
                        <div className="flex  lg:flex-row items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={bid?.bidderPhoto} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold  text-black">
                              {bid?.bidderName}
                            </div>
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
                      <td className="text-black bg-white">
                        {bid?.productName}
                      </td>
                      <td className="text-black bg-white">
                        {bid.item?.length}
                      </td>
                      <td className="text-black bg-white">{bid.bidAmount}$</td>
                      <td>
                        <div className="dropdown dropdown-hover">
                          <label tabIndex={0} className=" bg-white m-1">
                            <details>
                              <summary className="text-black">Items</summary>
                            </details>
                          </label>
                          <table
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <thead className="bg-white">
                              <tr className="bg-white">
                                <td className="text-black bg-white">item</td>
                                <td className="text-black bg-white">spec</td>
                              </tr>{" "}
                            </thead>
                            {bid?.item?.reverse().map(i => (
                              <tr className="bg-white">
                                <td className="text-black bg-white">
                                  {i?.koyel?.item}
                                </td>
                                <td className="text-black bg-white">
                                  {i?.koyel?.spec}
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
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
