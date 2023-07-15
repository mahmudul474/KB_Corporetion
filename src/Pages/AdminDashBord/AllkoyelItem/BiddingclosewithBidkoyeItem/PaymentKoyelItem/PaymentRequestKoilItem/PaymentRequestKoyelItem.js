import React, { useEffect, useState } from "react";
import PaymentDettaisPopup from "./PaymentDettaisPopup/PaymentDettaisPopup";
import { BsChevronBarDown } from "react-icons/bs";

export default function PaymentRequestKoyelItem({ data }) {
  const [requests, setRequests] = useState([]);

  ///  get payment request
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/product/koyel-item/payment/${data?._id}`
    )
      .then(response => response.json())
      .then(data => {
        setRequests(data);
      });
  }, [requests]);

  //sum  bid amaount
  const TotalBidAmount = requests.reduce((sum, item) => {
    const koyelBidAmounts = item.koyel.map(koyel =>
      Number(koyel.koyel.bidAmount)
    );
    return sum + koyelBidAmounts.reduce((subSum, amount) => subSum + amount, 0);
  }, 0);

  /// payment dettails pop  up
  const [productid, setProductid] = useState(null);
  const [paymentItems, setPaymentItem] = useState({});
  const [product, setProduct] = useState({});

  const openPaymentPopup = id => {
    setProductid(id);
  };

  const closePaymentPopup = () => {
    setProductid(null);
  };

  return (
    <div>
      <div className="overflow-auto h-[400px] lg:h-[600px]  border border-black ">
        <h1 className="text-[#719f18] text-lg  font-semibold">
          Payment Requests
        </h1>
        <table className="table  table-pin-rows ">
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
            {[...requests]?.reverse().map((request, index) => (
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
                  <div className="flex items-center space-x-3">
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
                <td
                  onClick={() => {
                    openPaymentPopup(request?._id);
                    setProduct(request);
                    setPaymentItem(request?.paymentDetails);
                  }}
                  className="hover:underline cursor-pointer"
                >
                  Payment
                </td>
                <td>
                  {request?.status === "pending" ||
                  request?.status === "approve" ? (
                    <button className="btn btn-success">Success</button>
                  ) : (
                    <button className="btn btn-error">felid</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {productid && (
        <PaymentDettaisPopup
          data={product}
          closePaymentPopup={closePaymentPopup}
          paymentDetails={paymentItems}
        >
          {" "}
        </PaymentDettaisPopup>
      )}
    </div>
  );
}
