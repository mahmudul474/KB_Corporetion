import React, { useEffect, useState } from "react";
import Product from "../../Shared/ProductCard/Product";

export default function Ga() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/category/po`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
        className="h-[200px] bg-opacity-50 flex flex-col justify-center items-start px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
      >
        <div>
          <h1 className="text-2xl capitalize  font-semibold">Live Actions</h1>
        </div>
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
      </div>

      <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl text-left  font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {
                products?.map(product=><Product data={product} key={product._id}></Product>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
