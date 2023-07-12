import React, { useEffect, useState } from "react";

export default function KoyelItemPaymentRow({ data }) {
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

  return (
    <tr>
      <td>
        {
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={product?.productImg} alt="product" />
              </div>
            </div>
            <div>
              <div className="font-bold">{product.productName}</div>
            </div>
          </div>
        }
      </td>
      <td>{data?.koyel?.length}</td>
      <td>
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
      </td>
      <td>
        {data?.status === "pending" || data?.status === "approve" ? (
          <button className="btn btn-success">{data?.status}</button>
        ) : (
          <button className="btn btn-error">Field</button>
        )}
      </td>
    </tr>
  );
}
