import React from "react";

export default function ActionHistory({ bids }) {
console.log(bids);

const reversedBids = bids ? [...bids].reverse() : [];

return (
  <div className="my-10   ">
    <div className=" overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="   font-bold text-xl text-[#719f18] text-left my-5 ">
        Bid History
      </h1>

      <div className="overflow-x-auto">
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
                <td>Bidding Price</td>
                <td>Time</td>
              </tr>
            </thead>
            <tbody>
              {reversedBids?.map((bid, index) => (
                <tr key={bid._id}>
                  <th>{index + 1}</th>
                  <td>
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
        )}
      </div>
    </div>
  </div>
);
}
