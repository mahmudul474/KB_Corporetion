import React, { useEffect, useState } from "react";
import BuyPaymentDettails from "./BuyPaymentDettails";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function OrderRow({ data }) {
  ///get img and  name

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
            <div className="font-bold text-black">
              {productDettails?.productName}
            </div>
          </div>
        </div>
      </td>
      <td className="text-black">
        item:{data?.koyel?.length}
        <p className="text-black">Price: {sum}$</p>
      </td>
      <td>
        <td>
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className=" m-1 flex text-black justify-center items-center cursor-pointer"
            >
              <span className="text-black">
                <BsChevronDown></BsChevronDown>
              </span>{" "}
              items
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-gray-200	 rounded-box "
            >
              <div className="overflow-x-auto bg-gray-200	">
                <table className="table ">
                  {/* head */}
                  <thead>
                    <tr className="text-black bg-white">
                      <th className="text-black bg-white">Item</th>
                      <th className="text-black bg-white">Spec</th>
                      <th className="text-black bg-white">Thickness</th>
                      <th className="text-black bg-white">Width</th>
                      <th className="text-black bg-white">TS</th>
                      <th className="text-black bg-white">YP</th>
                      <th className="text-black bg-white">EL</th>
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
            <div className="text-sm  ">
              email:{data?.paymentDetails?.bidderEmail}
            </div>
            <div className="text-sm  ">
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
        className="cursor-pointer text-black "
      >
        Info
      </td>
      <td>
        {data?.status === "approve" || data?.status === "pending" ? (
          <button className="btn btn-success">Success</button>
        ) : (
          <button className="btn btn-error">Field</button>
        )}
      </td>
      <td className="cursor-pointer hover:underline">
        <Link to={`/admin-dashboard/action/items/${data?.productID}`}>
          Details
        </Link>
      </td>

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
