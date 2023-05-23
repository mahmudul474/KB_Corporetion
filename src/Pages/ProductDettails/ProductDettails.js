import React, { useContext } from "react";
import ProductDettailsCard from "../../Shared/ProductDettailsCard/ProductDettailsCard";
import { useLoaderData } from "react-router-dom";

export default function ProductDettails() {
  const data = useLoaderData();
  return (
    <div>
      <ProductDettailsCard data={data}></ProductDettailsCard>
    </div>
  );
}
