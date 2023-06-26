import React, { useEffect, useState } from 'react'
import UpcoomingCard from "../UpcoomingCard/UpcoomingCard";

export default function All() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/upcoming`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  return (
    <div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
        {products?.slice(0, 2).map(product => (
          <UpcoomingCard data={product} key={product._id}></UpcoomingCard>
        ))}
      </div>
    </div>
  );
}
