import React, { useContext, useEffect, useState } from 'react'
import Product from '../../../Shared/ProductCard/Product';
import { AuthContext } from '../../../auth/AuthProbaider/AuthProvider';
import KoyelItemBids from "./KoyelItemBids/KoyelItemBids";

export default function MyBidds() {
  const { currentUser } = useContext(AuthContext);
  const [mybidds, setMybidds] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetch(
        `${process.env.REACT_APP_API_URL}/bids/bidder/${currentUser._id}/products`
      )
        .then(response => response.json())
        .then(data => {
          // Process the retrieved bidder bids
          setMybidds(data?.products);
        })
        .catch(error => {
          console.error("Error retrieving bidder bids", error);
        });
    } else {
    }
  }, [currentUser]);

  //kouel item

  return (
    <div className="mt-10">
      <h1 className="text-4xl capitalize  mb-[30px] text-left  pt-10 px-5 font-semibold">
        My Bids
      </h1>

      <h1 className="text-[#719f18] my-5 text-xl capitalize   font-semibold">
        Product Bid
      </h1>
      <div className="grid px-5 h-[500px] overflow-auto grid-cols-1 lg:grid-cols-2 gap-5">
        {[...mybidds].reverse().map(bid => (
          <Product data={bid} key={bid.id}></Product>
        ))}
      </div>
      <div className="">
        <h2 className="text-[#719f18]  my-5 text-xl capitalize   font-semibold">
          koyel item Bid
        </h2>
        <KoyelItemBids></KoyelItemBids>
      </div>
    </div>
  );
}
