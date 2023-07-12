import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BuyItemrow({ data }) {
  //load    product  img
  const [product, setProduct] = useState({});
  useEffect(() => {
    if (data) {
      fetch(
        `${process.env.REACT_APP_API_URL}/products/koyel-item/item/${data?.productID}`
      )
        .then(res => res.json())
        .then(data => {
          setProduct(data);
        });
    }
  }, [data]);

  // sum buy price
  const totalBuyNowPrice = data.koyel.reduce((total, item) => {
    const buyNowPrice = item.koyel.buyNowPrice || "0";
    return total + parseInt(buyNowPrice, 10);
  }, 0);

  console.log(data);

  return (
    <tr>
      <td>
        {" "}
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={product?.productImg} alt="productimg" s />
            </div>
          </div>
          <div>
            <div className="font-bold">{product?.productName}</div>
          </div>
        </div>
      </td>
      <td>{data?.koyel?.length}</td>

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

      <td>{totalBuyNowPrice + "$"}</td>
      <td>
        {" "}
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={data?.paymentDetails?.bankSleep} alt="banksleep" />
            </div>
          </div>
          <div>
            <div className="font-bold">
              Amount:{data?.paymentDetails?.amount}
              <div className="text-sm  ">
                tID:{data?.paymentDetails?.transaction}
              </div>
            </div>
          </div>
        </div>
      </td>

      <td>{data?.status}</td>
      <td>
        <Link to={`/excel/${data?.productID}`}>View</Link>
      </td>
    </tr>
  );
}
