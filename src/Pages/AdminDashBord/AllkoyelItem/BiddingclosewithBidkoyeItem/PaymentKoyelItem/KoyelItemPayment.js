import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import PaymentRequestKoyelItem from "./PaymentRequestKoilItem/PaymentRequestKoyelItem";
import SucceFullPayment from "./PaymentRequestKoilItem/PaymentDettaisPopup/SucceFullPayment/SucceFullPayment";
import { BsChevronDown } from "react-icons/bs";

export default function KoyelItemPayment() {
  const data = useLoaderData();

  console.log(data, "product datra ");

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
                    <td>Product</td>
                    <td>Winner</td>
                    <td>Total Win </td>
                    <td>Total Weight</td>
                    <td>Per kg Price</td>
                    <td>Total Amount</td>

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
                              <img src={winner?.productPhoto} alt="winner" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-black">
                              {winner?.productName}
                            </div>
                          </div>
                        </div>
                      </td>
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
                              {winner?.businessName}
                            </div>
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

                      <td>{winner?.winproduct?.length}</td>
                      <td>{winner?.totalWeight + "KG"}</td>
                      <td>{winner?.averagePerKgPrice?.toFixed(2) + "$"}</td>
                      <td>{winner?.total.toFixed(2) + "$"}</td>
                      <td>
                        {/* The button to open modal */}
                        <label htmlFor="my_modal_6" className="btn">
                          Products
                        </label>

                        {/* Put this part before </body> tag */}
                        <input
                          type="checkbox"
                          id="my_modal_6"
                          className="modal-toggle"
                        />
                        <div className="modal">
                          <div className="modal-box">
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
                                  {winner?.winproduct.map(item => (
                                    <tr className="bg-white text-black ">
                                      <th className="text-black">
                                        {item?.item}
                                      </th>
                                      <td className="text-black">
                                        {item?.spec}
                                      </td>
                                      <td className="text-black">
                                        {item?.Thickness}
                                      </td>
                                      <td className="text-black">
                                        {item?.Width}
                                      </td>
                                      <td className="text-black">{item?.TS}</td>
                                      <td className="text-black">{item?.YP}</td>
                                      <td className="text-black">{item?.EL}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="modal-action">
                              <label htmlFor="my_modal_6" className="btn">
                                Close!
                              </label>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-black">stutuse</td>
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
