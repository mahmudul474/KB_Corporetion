import React, { useEffect, useState } from "react";
import KoyelItemPaymentDettails from "./KoyuelItemPayment/KoyelItemPaymentDettails";
import ItemPopup from "../../../../Shared/ItemPopUp/ItemPopup";

export default function ItemWinRow({ data }) {
  const { _id } = data;

  const [product, setProduct] = useState({});

  //load    product  img
  useEffect(() => {
    if (_id) {
      fetch(`${process.env.REACT_APP_API_URL}/products/koyel-item/item/${_id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
        });
    }
  }, [_id]);

  const totalBidAmount = data.winners.reduce(
    (sum, item) => sum + item.bidAmount,
    0
  );

  const [selectedItemId, setselectedItemId] = useState(null);
  const [Winningitem, setWinitem] = useState([]);

  const openPopup = id => {
    setselectedItemId(id);
  };

  const closePopup = () => {
    setselectedItemId(null);
  };

  //pament

  const [productid, setProductid] = useState(null);
  const [paymentItems, setPaymentItem] = useState({});

  const openPaymentPopup = id => {
    setProductid(id);
  };

  const closePaymentPopup = () => {
    setProductid(null);
  };

  //when give me mutypy with  per tone
  //   const bidAmountSumByBidderId = data.winners.reduce((sumByBidderId, item) => {
  //     const { bidAmount, bidderId } = item;
  //     if (!sumByBidderId[bidderId]) {
  //       sumByBidderId[bidderId] = 0;
  //     }
  //     sumByBidderId[bidderId] += bidAmount * parseFloat(bidderId);
  //     return sumByBidderId;
  //   }, {});

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={product.productImg} alt="product" />
              </div>
            </div>
            <div>
              <div className="font-bold">{product.productName}</div>
            </div>
          </div>
        </td>
        <td>{data?.winners.length}</td>
        <td>
          <button
            onClick={() => {
              setWinitem(data?.winners);
              openPopup(_id);
            }}
            className="btn "
          >
            view winning Item{" "}
          </button>
        </td>
        <td>
          <h3> {totalBidAmount}$</h3>
        </td>

        <td>
          <button
            onClick={() => {
              setPaymentItem(data);
              openPaymentPopup(_id);
            }}
          >
            Pay
          </button>
        </td>
      </tr>

      {selectedItemId && (
        <ItemPopup data={Winningitem} close={closePopup}></ItemPopup>
      )}

      {productid && (
        <KoyelItemPaymentDettails
          close={closePaymentPopup}
          data={paymentItems}
        ></KoyelItemPaymentDettails>
      )}
    </>
  );
}
