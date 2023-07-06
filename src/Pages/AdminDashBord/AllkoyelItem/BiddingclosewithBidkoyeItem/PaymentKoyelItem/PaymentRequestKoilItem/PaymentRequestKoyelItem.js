import React, { useEffect, useState } from "react";
import PaymentDettaisPopup from "./PaymentDettaisPopup/PaymentDettaisPopup";

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
  }, []);

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
      <div className="overflow-x-auto h-[600px]">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>i</th>
              <td>item</td>
              <td>winner</td>
              <td>amount</td>
              <td>4</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
              <th></th>
            </tr>
          </thead>
          <tbody className="h-[600px]">
            {requests?.map((request, index) => (
              <tr key={request?._id}>
                <td>{index + 1}</td>
                <td>
                  {request?.koyel?.length}

                  <p>Price:{TotalBidAmount} $</p>
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
                            {request?.koyel?.map(item => (
                              <tr key={item?.koyel?._id}>
                                <td>{item?.koyel?.item}</td>
                                <td>{item?.koyel?.spec}</td>
                                <td>{item?.koyel?.Thickness}</td>
                                <td>{item?.koyel?.Width}</td>
                                <td>{item?.koyel?.weight}</td>
                                <td>{item?.koyel?.TS}</td>
                                <td>{item?.koyel?.YP}</td>
                                <td>{item?.koyel?.EL}</td>
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
                >
                  dettails
                </td>
                <td>12/16/2020</td>
                <td>Blue</td>
                <th>1</th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Job</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
              <th></th>
            </tr>
          </tfoot>
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
