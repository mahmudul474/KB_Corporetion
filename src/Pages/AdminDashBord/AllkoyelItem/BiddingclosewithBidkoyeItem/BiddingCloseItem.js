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
               <th text-black>Category</th>
               <th text-black>Shipping Cost</th>
               <th text-black>Total-item</th>
               <th text-black>Total-Bids</th>
               <th text-black>Total-Wins</th>
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
                 <td>{product?.category}</td>
                 <td>
                   {/* The button to open modal */}
                   <label htmlFor="my_modal_6" className="btn">
                     view
                   </label>

                   {/* Put this part before </body> tag */}
                   <input
                     type="checkbox"
                     id="my_modal_6"
                     className="modal-toggle"
                   />
                   <div className="modal">
                     <div className="modal-box">
                       <div className="overflow-x-auto">
                         <h1>Shipping Cost Per Kg</h1>
                         <table className="table">
                           {/* head */}
                           <thead>
                             <tr>
                               <th>Location</th>
                               <th>Container</th>
                               <th>Bulk</th>
                             </tr>
                           </thead>
                           <tbody>
                             {/* row 1 */}
                             <tr>
                               <td>Mongla</td>
                               <td>
                                 {product?.ShippingCost?.mongla.containerPrice +
                                   "$ KG"}{" "}
                               </td>
                               <td>
                                 {product?.ShippingCost?.mongla.bulkPrice +
                                   "$ KG"}
                               </td>
                             </tr>
                             <tr>
                               <td>chattogram</td>
                               <td>
                                 {product?.ShippingCost?.chattogram
                                   .containerPrice + "$ KG"}{" "}
                               </td>
                               <td>
                                 {product?.ShippingCost?.chattogram.bulkPrice +
                                   "$ KG"}
                               </td>
                             </tr>
                             {/* row 2 */}
                             <tr>
                               <td>dhaka</td>
                               <td>
                                 {product?.ShippingCost?.dhaka.containerPrice +
                                   "$ KG"}
                               </td>
                             </tr>
                             {/* row 3 */}
                             <tr>
                               <td>pangon</td>
                               <td>
                                 {product?.ShippingCost?.pangon.containerPrice +
                                   "$ KG"}
                               </td>
                               <td>
                                 {" "}
                                 {product?.ShippingCost?.pangon.bulkPrice +
                                   "$ KG"}
                               </td>
                             </tr>
                           </tbody>
                         </table>
                       </div>
                       <div className="modal-action">
                         <label htmlFor="my_modal_6" className="btn">
                           Close!
                         </label>
                       </div>
                     </div>
                   </div>
                 </td>

                 <td text-black>{product?.koyel?.length}</td>
                 <td text-black>{product?.bids?.length}</td>
                 <td text-black>{product?.winners?.length}</td>

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
