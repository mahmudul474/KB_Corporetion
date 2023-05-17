import React, { useEffect, useState } from 'react'
import UpcommingProductCard from '../../../../Shared/UpcommingProductCard/UpcommingProductCard'

export default function All() {


const [products,setProducts]=useState([])

useEffect(()=>{
  fetch("products.json")
  .then(res=>res.json())
  .then(data=>{
    setProducts(data)
  })
},[])



  return (
    <div>
      
      
      {
        products?.map(product=><UpcommingProductCard key={product._id} data={product}></UpcommingProductCard>)
      }
      
      
      </div>
  )
}
