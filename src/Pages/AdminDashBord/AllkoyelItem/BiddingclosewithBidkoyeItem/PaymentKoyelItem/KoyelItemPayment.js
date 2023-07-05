import React from "react";
import { useLoaderData } from "react-router-dom";

export default function KoyelItemPayment() {
  const data = useLoaderData();

 
  return (
    <div>
      <div className="flex justify-between flex-col lg:flex-row ">
        <div className=" w-full">
          <div className="overflow-x-auto">
            <table className="table  ">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Job</td>
                  <td>company</td>
                  <td>location</td>
                  <td>Last Login</td>
                  <td>Favorite Color</td>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.winners?.map(winner => (
                  <tr>
                    <td>
                      {" "}
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={winner?.bidderPhoto}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{winner?.bidderName}</div>
                          <div className="text-sm opacity-50">
                            {winner?.bidderEmail}
                          </div>
                          <div className="text-sm opacity-50">
                            {winner?.bidderNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className=" m-1 cursor-pointer">
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
                                <tr>
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
                                <tr>
                                  <th>{winner?.item}</th>
                                  <td>{winner?.spec}</td>
                                  <td>{winner?.Thickness}</td>
                                  <td>{winner?.Width}</td>
                                  <td>{winner?.TS}</td>
                                  <td>{winner?.YP}</td>
                                  <td>{winner?.EL}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </ul>
                      </div>
                    </td>
                    <td>{winner?.buyNowPrice}</td>
                    <td>{winner?.currentBid}</td>
                    <td>{winner?.bidAmount}</td>
                    <td>Blue</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border w-full border-black">2</div>
      </div>
    </div>
  );
}
