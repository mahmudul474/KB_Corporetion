import React, { useEffect, useState } from "react";
import Product from "../../Shared/ProductCard/Product";
import { getAllProducts } from "../../api/allProduct";

export default function Action() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then(data => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) {
    return <h1>loading .........</h1>;
  }

  return (
    <div className="px-4 my-12 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full  gap-10 ">
          {products.map(product => (
            <Product key={product._id} data={product}></Product>
          ))}
        </div>
      </div>
    </div>
  );
}
