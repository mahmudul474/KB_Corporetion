import React, { useEffect, useState } from "react";
import Product from "../../Shared/ProductCard/Product";
import hrBg from "./assates/hr.jpg";

export default function Ga() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/category/po`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${hrBg})`
        }}
        className="h-[200px]    bg-opacity-50 flex flex-col justify-center items-start"
      >
        <div className=" px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div>
            <h1 className="text-2xl text-white capitalize    font-semibold">
              Live Actions
            </h1>
          </div>
          <div className="text-sm breadcrumbs text-white">
            <ul>
              <li>
                <a>Categoty</a>
              </li>
              <li>
                <a>Po</a>
              </li>
              <li>Product</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl   text-left font-bold tracking-tight text-gray-900">
            PO/HR (Hot Rolled) Steel Coils and Sheets
          </h2>
          <p className="text-black hidden lg:block text-left">
            Discover the strength and versatility of our Hot Rolled (PO/HR)
            steel coils and sheets. Known for their robustness and malleability,
            these steel products are perfect for projects requiring structural
            integrity and ease of shaping. With a range of sizes and thicknesses
            available, our PO/HR steel is the go-to choice for applications in
            manufacturing, construction, and beyond.
          </p>
          <div className="divider w-full my-3 h-[2px] text-black bg-black"></div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map(product => (
              <Product data={product} key={product._id}></Product>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
