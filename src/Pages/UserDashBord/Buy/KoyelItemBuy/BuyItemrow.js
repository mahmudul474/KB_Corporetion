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
                    <th className="text-black ">Item</th>
                    <th className="text-black ">Spec</th>
                    <th className="text-black ">Thickness</th>
                    <th className="text-black ">Width</th>
                    <th className="text-black ">TS</th>
                    <th className="text-black ">YP</th>
                    <th className="text-black ">EL</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.koyel?.map(item => (
                    <tr key={item?.koyel?._id}>
                      <td className="text-black ">{item?.koyel?.item}</td>
                      <td className="text-black ">{item?.koyel?.spec}</td>
                      <td className="text-black ">{item?.koyel?.Thickness}</td>
                      <td className="text-black ">{item?.koyel?.Width}</td>
                      <td className="text-black ">{item?.koyel?.weight}</td>
                      <td className="text-black ">{item?.koyel?.TS}</td>
                      <td className="text-black ">{item?.koyel?.YP}</td>
                      <td className="text-black ">{item?.koyel?.EL}</td>
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
        <Link to={`/product/${data?.productID}`}>View</Link>
      </td>
    </tr>
  );
}
