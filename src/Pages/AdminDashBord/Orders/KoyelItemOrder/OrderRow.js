import React, { useEffect, useState } from "react";
import BuyPaymentDettails from "./BuyPaymentDettails";

export default function OrderRow({ data }) {
  ///get img and namec

  const [productDettails, setProductDettailse] = useState({});

  useEffect(() => {
    if (data?.productID) {
      fetch(
        `${process.env.REACT_APP_API_URL}/products/koyel-item/item/${data?.productID}`
      )
        .then(res => res.json())
        .then(data => {
          setProductDettailse(data);
        });
    }
  }, []);

  //sum  bid amaount
  const buyNowPrices = data.koyel.map(koyel => Number(koyel.koyel.buyNowPrice));
  const sum = buyNowPrices.reduce((total, price) => total + price, 0);

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
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={productDettails?.productImg} alt="product" />
            </div>
          </div>
          <div>
            <div className="font-bold">{productDettails?.productName}</div>
          </div>
        </div>
      </td>
      <td>
        item:{data?.koyel?.length}
        <p>Price: {sum}$</p>
      </td>
      <td>
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
                    {data?.koyel?.map(item => (
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
      </td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={data?.paymentDetails?.bidderPhoto} alt="bidder" />
            </div>
          </div>
          <div>
            <div className="font-bold">{data?.paymentDetails?.bidderName}</div>
            <div className="text-sm opacity-50">
              email:{data?.paymentDetails?.bidderEmail}
            </div>
            <div className="text-sm opacity-50">
              Mob:{data?.paymentDetails?.bidderNumber}
            </div>
          </div>
        </div>
      </td>
      <td
        onClick={() => {
          openPaymentPopup(data?._id);
          setProduct(data);
          setPaymentItem(data?.paymentDetails);
        }}
      >
        dettails
      </td>
      <td>Blue</td>
      <th>1</th>

      {productid && (
        <BuyPaymentDettails
          data={product}
          closePaymentPopup={closePaymentPopup}
          paymentDetails={paymentItems}
        >
          {" "}
        </BuyPaymentDettails>
      )}
    </tr>
  );
}
