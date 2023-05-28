import React, { useEffect, useState } from 'react'
import UpcommingProductCard from '../../../../Shared/UpcommingProductCard/UpcommingProductCard'

export default function All() {


const [products,setProducts]=useState([])

useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/products/upcoming`)
    .then(res => res.json())
    .then(data => {
      setProducts(data);
    });
}, []);

console.log(products);

return (
  <div>
    {products?.slice(0, 3).map(product => (
      <UpcommingProductCard
        key={product._id}
        data={product}
      ></UpcommingProductCard>
    ))}
  </div>
);
}
