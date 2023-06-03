import React, { useEffect, useState } from "react";
import Animation from "../../../Shared/Animation/Animation";
import ProductCard from "./Product_Card/ProductCard";
import LoadingSpiner from "../../../Shared/LoadingSpiner/LoadingSpiner";

export default function Allproducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpiner></LoadingSpiner>;
  }

  return (
    <div>
      <h1 className="text-2xl    capitalize  "> All products </h1>

      <div className=" grid  gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
        {products?.map(product => (
          <ProductCard key={product._id} data={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}
