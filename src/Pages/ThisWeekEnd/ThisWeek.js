import React, { useEffect, useState } from "react";
import Product from "../../Shared/ProductCard/Product";

export default function ThisWeek() {
  const [products, setProducts] = useState([]);
 
useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/products/bidding-end-week`)
    .then(res => res.json())
    .then(data => {
      setProducts(data);
    });
}, []);

return (
  <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <h1 className="text capitalize text-xl  text-left  font-semibold  my-10 text-[#719f18]">
      This week is end Bidding
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-5">
      {[...products].reverse().map(product => (
        <Product data={product} key={product._id}></Product>
      ))}
    </div>
  </div>
);
}
