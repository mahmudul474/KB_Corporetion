import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import { Link } from "react-router-dom";

export default function KoyelItemBids() {
  const { currentUser } = useContext(AuthContext);
  const [koyelbids, setKoyelbids] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetch(
        `${process.env.REACT_APP_API_URL}/bids/bidder/${currentUser?._id}/products/koyel`
      )
        .then(response => response.json())
        .then(data => {
          // Process the retrieved bidder bids
          setKoyelbids(data?.products);
        })
        .catch(error => {
          console.error("Error retrieving bidder bids", error);
        });
    } else {
    }
  }, [currentUser]);

  return (
    <div className="overflow-auto h-[400px]   ">
      <table className="table table-xs table-pin-rows">
        <thead>
          <tr className="bg-white">
            <td className="text-black">Product</td>
            <td className="text-black">Per Ton Price</td>
            <td className="text-black">Start Time</td>
            <td className="text-black">End Time</td>
            <td className="text-black">Details</td>
          </tr>
        </thead>
        <tbody>
          {[...koyelbids].reverse()?.map(product => (
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={product?.mainImage} alt="prroduct" />
                    </div> 
                  </div>
                  <div>
                    <div className="font-bold text-black ">{product?.name}</div>
                  </div>
                </div>
              </td>
              <td className="text-black "> {product?.startBiddingPrice}$</td>
              <td className="text-black ">{product?.startBiddingTime}</td>
              <td className="text-black ">{product?.endBiddingTime}</td>

              <td className="text-black ">
                <Link to={`/product/${product?._id}`}>view</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
