import React, { useEffect, useState } from "react";
import bg from "./img/cr.png";
import Product from "../../../Shared/ProductCard/Product";

export default function Products() {
  const [products, setProducts] = useState();
  console.log(products)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/koyel`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const reversedAndSlicedProducts = products?.slice(0, 3).reverse();

  return (
    <div>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="text-black my-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl text-black font-semibold">Products</h1>
          <p className="text-gray-500 text-lg">
            We are giving away our first UI kit for free. It includes over 130
            sections, built with TailwindCSS, for your awesome projects
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2 ">
          {reversedAndSlicedProducts?.map((product) => (
           <Product data={product}></Product>
          ))}
        </div>
      </div>
    </div>
  );
}
