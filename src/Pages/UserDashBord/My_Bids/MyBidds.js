import React, { useContext, useEffect, useState } from 'react'
import Product from '../../../Shared/ProductCard/Product';
import { AuthContext } from '../../../auth/AuthProbaider/AuthProvider';
import KoyelItemBids from "./KoyelItemBids/KoyelItemBids";

export default function MyBidds() {
  const { currentUser } = useContext(AuthContext);
  

  //kouel item

  return (
    <div className="mt-10">
      <h1 className="text-4xl text-black  capitalize  mb-[30px] text-left  pt-10 px-5 font-semibold">
        My Bids
      </h1>
 
      
      <div className="p-5">
        <h2 className="text-[#719f18]  my-5 text-xl capitalize   font-semibold">
        Product Bid
        </h2>
        <KoyelItemBids></KoyelItemBids>
      </div>
    </div>
  );
}
