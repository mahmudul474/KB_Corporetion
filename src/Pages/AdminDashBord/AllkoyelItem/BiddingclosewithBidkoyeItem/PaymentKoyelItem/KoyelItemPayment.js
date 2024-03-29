import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import PaymentRequestKoyelItem from "./PaymentRequestKoilItem/PaymentRequestKoyelItem";
import SucceFullPayment from "./PaymentRequestKoilItem/PaymentDettaisPopup/SucceFullPayment/SucceFullPayment";
import { BsChevronDown } from "react-icons/bs";

export default function KoyelItemPayment() {
  const data = useLoaderData();
  const [successfulPayment, setSucceFullPayment] = useState([]);

  ///get all  successful payments

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/approved/${data?._id}`)
      .then(res => res.json())
      .then(data => {
        setSucceFullPayment(data);
      });
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between items-start flex-col lg:flex-row ">
          <div className=" lg:w-2/4 w-full border border-black">
            <h1 className="text-[#719f18] text-lg  font-semibold">Winners</h1>
            <div className=" h-[400px] lg:h-[600px] overflow-auto w-full ">
              <table className=" table table-xs table-pin-rows   ">
                <thead className="bg-white  text-black">
                  <tr className="bg-white  text-black">
                    <td>Winner</td>
                    <td>Items</td>
                    <td>bid price</td>
                    <td>Win Amount</td>

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
                              <img src={winner?.bidderPhoto} alt="winner" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-black">
                              {winner?.bidderName}
                            </div>
                            <div className="text-sm text-black">
                              {winner?.bidderEmail}
                            </div>
                            <div className="text-sm text-black">
                              {winner?.bidderNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown dropdown-hover">
                          <label
                            tabIndex={0}
                            className=" flex items-center text-black justify-center m-1 cursor-pointer"
                          >
                            <span className="text-black">
                              <BsChevronDown></BsChevronDown>
                            </span>
                            items
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-gray-200	 rounded-box "
                          >
                            <div className="overflow-x-auto bg-white text-black	">
                              <table className="table table-zebra">
                                {/* head */}
                                <thead className="bg-white text-black ">
                                  <tr className="bg-white text-black ">
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
                                  <tr className="bg-white text-black ">
                                    <th className="text-black">
                                      {winner?.item}
                                    </th>
                                    <td className="text-black">
                                      {winner?.spec}
                                    </td>
                                    <td className="text-black">
                                      {winner?.Thickness}
                                    </td>
                                    <td className="text-black">
                                      {winner?.Width}
                                    </td>
                                    <td className="text-black">{winner?.TS}</td>
                                    <td className="text-black">{winner?.YP}</td>
                                    <td className="text-black">{winner?.EL}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </ul>
                        </div>
                      </td>
                      <td className="text-black">{winner?.currentBid + "$"}</td>
                      <td className="text-black">{winner?.bidAmount + "$"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="h-[400px] lg:h-[600px] overflow-auto w-full    ">
            <PaymentRequestKoyelItem data={data}></PaymentRequestKoyelItem>
          </div>
        </div>
        <div className="mt-[20px]">
          <h1 className="text-[#719f18] text-lg  font-semibold">
            Payment Success
          </h1>

          <SucceFullPayment data={successfulPayment}></SucceFullPayment>
        </div>
      </div>
    </>
  );
}
