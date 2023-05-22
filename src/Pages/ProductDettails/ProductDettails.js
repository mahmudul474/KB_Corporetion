import React from 'react'
import ProductDettailsCard from '../../Shared/ProductDettailsCard/ProductDettailsCard'
import { useLoaderData } from "react-router-dom";

export default function ProductDettails() {
  const data = useLoaderData();

  console.log(data);

  return (
    <div>
      <ProductDettailsCard data={data}></ProductDettailsCard>
    </div>
  );
}
