import React from "react";

export default function SingelProductActionHistory({ bids }) {
  const reversedBids = bids ? [...bids].reverse() : [];

  return (
    <div className="my-10   ">
      <div className=" overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="   font-bold text-xl text-[#719f18] text-left my-5 ">
          Bid History
        </h1>

        <div className=" overflow-auto h-[500px] shadow-md sm:rounded-lg ">
          {reversedBids && reversedBids.length === 0 ? (
            <div>
              {" "}
              <h2 className="text-xl  my-6 text-center   text-red-400 capitalize">
                No Bids Yet
              </h2>{" "}
            </div>
          ) : (
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <td>index</td>
                  <td>Bider</td>
                  <td>Product</td>
                  <td>Product Name</td>
                  <td>Total Item</td>
                  <td>Bidding Price</td>
                  <td>item</td>
                </tr>
              </thead>
              <tbody>
                {reversedBids?.map((bid, index) => (
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
                    <td>{bid.item?.length}</td>
                    <td>{bid.bidAmount}$</td>
                    <td>
                      <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn m-1">
                          Hover
                        </label>
                        <table
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <thead>
                            <tr>
                              <td>item</td>
                              <td>spec</td>
                            </tr>{" "}
                          </thead>
                          {bid?.item?.reverse().map(i => (
                            <tr>
                              <td>{i?.koyel?.item}</td>
                              <td>{i?.koyel?.spec}</td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
