import React, { useEffect, useState } from "react";
import Animation from "../../../Shared/Animation/Animation";
import ProductCard from "./Product_Card/ProductCard";

export default function Allproducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  console.log(products);

  return (
    <div>
      <h1> All products </h1>

      <div className=" grid  gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
        {products?.map(product => (
          <ProductCard key={product._id} data={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}
