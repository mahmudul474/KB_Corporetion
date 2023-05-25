import React, { useContext, useEffect, useState } from 'react'
import Product from '../../../Shared/ProductCard/Product';
import { AuthContext } from '../../../auth/AuthProbaider/AuthProvider';

export default function MyBidds() {
    const {currentUser}=useContext(AuthContext)
    const [mybidds,setMybidds]=useState([])
  
    
    const fetchBidderBids = () => {
        // Replace with the actual bidder ID
        fetch(`http://localhost:5000/bids/bidder/${currentUser._id}/products`)
          .then(response => response.json())
          .then(data => {
            // Process the retrieved bidder bids
            setMybidds(data?.products);
          })
          .catch(error => {
            console.error("Error retrieving bidder bids", error);
          });
      };
      
      // Call the fetchBidderBids function to retrieve the bidder's bids
      useEffect(() => {
        fetchBidderBids();
      }, [currentUser?._id]);
      


  return (
    <div className='mt-10' >


<div className='grid px-5 grid-cols-1 lg:grid-cols-2 gap-5'>

{
    mybidds?.map(bid=><Product data={bid} ></Product>)
}
</div>
   

    </div>
  )
}
