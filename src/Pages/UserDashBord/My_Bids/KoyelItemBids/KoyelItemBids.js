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
    <div className="overflow-y-auto h-[400px] overflow-x-auto ">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <td>Product</td>
            <td>Per Ton Price</td>
            <td>Start Time</td>
            <td>End Time</td>
            <td>Details</td>
          </tr>
        </thead>
        <tbody>
          {koyelbids?.map(product => (
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={product?.mainImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{product?.name}</div>
                  </div>
                </div>
              </td>
              <td>{product?.startBiddingPrice}$</td>
              <td>{product?.startBiddingTime}</td>
              <td>{product?.endBiddingTime}</td>

              <td>
                <Link to={`/excel/${product?._id}`}>view</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
