import React from "react";
import { BsChevronBarDown } from "react-icons/bs";

export default function SucceFullPayment({ data }) {
  const TotalBidAmount = data.reduce((sum, item) => {
    const koyelBidAmounts = item.koyel.map(koyel =>
      Number(koyel.koyel.bidAmount)
    );
    return sum + koyelBidAmounts.reduce((subSum, amount) => subSum + amount, 0);
  }, 0);
  return (
    <div className=" overflow-auto h-[400px] border border-black">
      <table className="table table-xs table-pin-rows ">
        <thead className="bg-white text-black">
          <tr className="bg-white text-black">
            <th>i</th>
            <td>item</td>
            <td>Wins</td>
            <td>winner</td>
            <td>Payments</td>
            <td>status</td>
          </tr>
        </thead>
        <tbody>
          {[...data]?.reverse().map((request, index) => (
            <tr className="bg-white text-black" key={request?._id}>
              <td>{index + 1}</td>
              <td>
                {request?.koyel?.length}

                <p>Price:{TotalBidAmount} $</p>
              </td>
              <td>
                <div className="dropdown dropdown-hover">
                  <label
                    tabIndex={0}
                    className="flex justify-center items-end  m-1 cursor-pointer"
                  >
                    <span>
                      <BsChevronBarDown></BsChevronBarDown>
                    </span>{" "}
                    items
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-gray-200	 rounded-box "
                  >
                    <div className="overflow-x-auto bg-gray-200	">
                      <table className="table table-zebra">
                        {/* head */}
                        <thead>
                          <tr className="bg-white text-black">
                            <th>Item</th>
                            <th>Spec</th>
                            <th>Thickness</th>
                            <th>Width</th>
                            <th>TS</th>
                            <th>YP</th>
                            <th>EL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {request?.koyel?.map(item => (
                            <tr
                              className="bg-white text-black"
                              key={item?.koyel?._id}
                            >
                              <td className="bg-white text-black">
                                {item?.koyel?.item}
                              </td>
                              <td className="bg-white text-black">
                                {item?.koyel?.spec}
                              </td>
                              <td className="bg-white text-black">
                                {item?.koyel?.Thickness}
                              </td>
                              <td className="bg-white text-black">
                                {item?.koyel?.Width}
                              </td>
                              <td className="bg-white text-black">
                                {item?.koyel?.weight}
                              </td>
                              <td className="bg-white text-black">
                                {item?.koyel?.TS}
                              </td>
                              <td className="bg-white text-black">
                                {item?.koyel?.YP}
                              </td>
                              <td className="bg-white text-black">
                                {item?.koyel?.EL}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ul>
                </div>
              </td>
              <td>
                <div className="flex items-center  ">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={request?.paymentDetails?.bidderPhoto}
                        alt="bidder"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {request?.paymentDetails?.bidderName}
                    </div>
                    <div className="text-sm opacity-50">
                      email:{request?.paymentDetails?.bidderEmail}
                    </div>
                    <div className="text-sm opacity-50">
                      Mob:{request?.paymentDetails?.bidderNumber}
                    </div>
                  </div>
                </div>
              </td>
              <td>{request?.paymentDetails?.amount + "$"}</td>
              <td>
                <button className="btn btn-success">Success</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
