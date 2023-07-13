import React, { useEffect, useState } from "react";
import Product from "../../Shared/ProductCard/Product";

export default function ThisWeek() {
  const [products, setProducts] = useState([]);
const [noOfElement, setNoOfelement] = useState(6);
useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/products/bidding-end-week`)
    .then(res => res.json())
    .then(data => {
      setProducts(data);
    });
}, []);

const pointer = products?.slice(0, noOfElement);
const loadmore = () => {
  setNoOfelement(noOfElement + 3);
};

return (
  <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <h1 className="text capitalize text-center text-4xl  font-semibold  my-10 text-green-600">
      This week is end Bidding{" "}
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-5">
      {[...pointer].reverse().map(product => (
        <Product data={product} key={product._id}></Product>
      ))}
    </div>
    {products?.length > 6 && (
      <div className="my-8">
        <button
          onClick={loadmore}
          className="btn btn-wide bg-[#719f18] text-white hover:bg-[#73471b]"
        >
          Load More
        </button>
      </div>
    )}
  </div>
);
}
