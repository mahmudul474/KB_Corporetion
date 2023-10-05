import React from "react";

export default function SingelProductActionHistory({ bids }) {
  const reversedBids = bids ? [...bids].reverse() : [];

  console.log(reversedBids);
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
                    <td className="text-black bg-white">Per Kg price</td>
                    <td className="text-black bg-white">Total Item</td>
                    <td className="text-black bg-white">Weight</td>

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
                      <td className="text-black bg-white">{bid.perkgPrice}</td>
                      <td className="text-black bg-white">
                        {bid.items?.length}
                      </td>
                      <td className="text-black bg-white">
                        {bid.weight && bid.weight}
                      </td>
                      <td className="text-black bg-white">{bid.bidAmount}$</td>
                      <td>
                        <a href="#bidding_items" className="btn">
                          vieW  Items
                        </a>

                        <div className="modal" id="bidding_items">
                          <div className="modal-box">
                            <div className="overflow-x-auto">
                              <table className="table">
                                <thead className="bg-white">
                                  <tr className="bg-white">
                                    <td className="text-black bg-white">
                                      item
                                    </td>
                                    <td className="text-black bg-white">
                                      spec
                                    </td>
                                    <td className="text-black bg-white">
                                      THICKNESS
                                    </td>
                                    <td className="text-black bg-white">
                                      WIDTH
                                    </td>
                                    <td className="text-black bg-white">
                                      WEIGHT
                                    </td>
                                    <td className="text-black bg-white">TS</td>
                                    <td className="text-black bg-white">YP</td>
                                    <td className="text-black bg-white">EL</td>
                                  </tr>{" "}
                                </thead>
                                <tbody>
                                  {/* row 1 */}

                                  {bid?.items?.reverse().map(i => (
                                    <tr className="bg-white">
                                      <td className="text-black bg-white">
                                        {i?.item}
                                      </td>
                                      <td className="text-black bg-white">
                                        {i?.spec}
                                      </td>
                                      <td className="text-black bg-white">
                                        {i?.Thickness}
                                      </td>
                                      <td className="text-black bg-white">
                                        {i?.Width}
                                      </td>
                                      <td className="text-black bg-white">
                                        {i?.weight + "kg"}
                                      </td>
                                      <td className="text-black bg-white">
                                        {i?.TS}
                                      </td>
                                      <td className="text-black bg-white">
                                        {i?.YP}
                                      </td>
                                      <td className="text-black bg-white">
                                        {i?.EL}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="modal-action">
                              <a href="#" className="btn">
                                 close 
                              </a>
                            </div>
                          </div>
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
