import React, { useEffect, useState } from 'react'
import UpcommingProductCard from '../../../../Shared/UpcommingProductCard/UpcommingProductCard'

export default function Live() {


const [products,setProducts]=useState([])

useEffect(()=>{
  fetch("products.json")
  .then(res=>res.json())
  .then(data=>{
    setProducts(data)
  })
},[])



  return (
    <div> {
        products?.slice(2, 5).map(product=><UpcommingProductCard key={product._id} data={product}></UpcommingProductCard>)
      }</div>
  )
}
