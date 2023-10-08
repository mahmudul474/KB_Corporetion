import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpiner from "../../../../Shared/LoadingSpiner/LoadingSpiner";

export default function BiddingCloseItem() {
  const {
    data: koyelItems = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: "koyelItems",
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/koyel-item/closed-bids/with-bids`
      );
      const data = await res.json();
      return data;
    }
  });


 if(isLoading){
  return <LoadingSpiner></LoadingSpiner>
 }




 console.log(koyelItems);

   return (
     <div>
       <div className="  shadow-md sm:rounded-lg">
         <div className="flex items-center justify-between pb-4 bg-white  ">
           <div>
             <button
               className="inline-flex items-center text-black bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 "
               type="button"
             >
               Bidding End
             </button>
           </div>
         </div>
         <table className="w-full text-sm text-left text-black ">
           <thead className="text-xs text-black first-line:uppercase bg-gray-50">
             <tr>
               <th text-black>Product</th>
               <th text-black>Start bid</th>

               <th text-black>Details</th>
               <th text-black>Payment</th>
             </tr>
           </thead>

           {[...koyelItems]?.reverse().map(product => (
             <tbody>
               <tr className="bg-white border-b     hover:bg-gray-50  ">
                 <th
                   scope="row"
                   className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap  "
                 >
                   <img
                     className="w-10 h-10 rounded-full"
                     src={product?.mainImage}
                     alt="product img"
                   />
                   <div className="pl-3">
                     <div className="text-base font-semibold">
                       {product.name}
                     </div>
                   </div>
                 </th>
                 <td text-black>{product?.startBiddingPrice}</td>

                 <td text-black>
                   <Link
                     to={`/admin-dashboard/action/items/${product._id}`}
                     className="font-medium text-black hover:underline"
                   >
                     Details
                   </Link>
                 </td>
                 <td text-black>
                   {" "}
                   <Link
                     className="font-medium text-black  hover:underline"
                     to={`/admin-dashboard/products/koyel-item/payment/${product._id}`}
                   >
                     Payment & winners
                   </Link>
                 </td>
               </tr>
             </tbody>
           ))}
         </table>
       </div>
     </div>
   );
}
